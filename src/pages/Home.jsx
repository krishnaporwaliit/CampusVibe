import React, { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import RatingCard from '../components/RatingCard';
import RatingModal from '../components/RatingModal';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Feed');
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      const q = query(collection(db, 'users'), limit(50));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== currentUser.uid) {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        }
      });
      
      if (activeTab === 'Top Rated') {
        fetchedUsers.sort((a, b) => b.averageRating - a.averageRating);
      } else {
        // Random shuffle for Feed
        fetchedUsers.sort(() => 0.5 - Math.random());
      }
      
      setUsers(fetchedUsers);
    }
    fetchUsers();
  }, [activeTab, currentUser.uid]);

  const handleRate = async (score) => {
    if (!selectedUser) return;
    try {
      const ratingRef = doc(db, 'ratings', `${currentUser.uid}_${selectedUser.id}`);
      const ratingSnap = await getDoc(ratingRef);
      
      let oldScore = 0;
      const hasRated = ratingSnap.exists();
      if (hasRated) oldScore = ratingSnap.data().score;
      
      await setDoc(ratingRef, {
        raterId: currentUser.uid,
        ratedId: selectedUser.id,
        score,
        timestamp: new Date().toISOString()
      });
      
      const userRef = doc(db, 'users', selectedUser.id);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      
      let newCount = userData.ratingCount || 0;
      let oldAvg = userData.averageRating || 0;
      
      if (!hasRated) newCount += 1;
      
      const totalScore = (oldAvg * (hasRated ? newCount : newCount - 1)) - oldScore + score;
      const newAvg = totalScore / newCount;
      
      await updateDoc(userRef, {
        ratingCount: newCount,
        averageRating: newAvg
      });
      
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ratingCount: newCount, averageRating: newAvg } : u));
      setSelectedUser(null);
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Failed to submit rating: " + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex bg-gray-100/50 rounded-xl p-1 mb-6">
        {['Feed', 'Top Rated'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {users.map(user => (
          <RatingCard key={user.id} user={user} onClick={() => setSelectedUser(user)} />
        ))}
      </div>
      
      {selectedUser && (
        <RatingModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
          onSubmit={handleRate} 
        />
      )}
    </div>
  );
}

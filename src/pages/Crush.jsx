import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Search, Heart } from 'lucide-react';

export default function Crush() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [crushes, setCrushes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      // Fetch all users
      const userQ = query(collection(db, 'users'));
      const userSnap = await getDocs(userQ);
      const fetchedUsers = [];
      userSnap.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(fetchedUsers);

      // Fetch today's crushes
      const today = new Date().toISOString().split('T')[0];
      const crushQ = query(collection(db, 'crushes'));
      const crushSnap = await getDocs(crushQ);
      const todayCrushes = [];
      crushSnap.forEach(doc => {
        const data = doc.data();
        if (data.from === currentUser.uid && data.date === today) {
          todayCrushes.push(data.to);
        }
      });
      setCrushes(todayCrushes);
    }
    fetchData();
  }, [currentUser.uid]);

  const handlePickCrush = async (user) => {
    if (crushes.length >= 3) return alert('You can only pick 3 crushes per day!');
    if (crushes.includes(user.id)) return alert('You already picked them today!');
    
    const crushRef = doc(db, 'crushes', `${currentUser.uid}_${user.id}`);
    await setDoc(crushRef, {
      from: currentUser.uid,
      to: user.id,
      date: new Date().toISOString().split('T')[0],
      matched: false
    });
    
    setCrushes([...crushes, user.id]);
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-6 rounded-2xl border border-pink-500/20">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Heart className="text-rose-500" /> Anonymous Crush
        </h2>
        <p className="text-sm text-gray-600">Pick up to 3 people you have a crush on. If they pick you too, it's a match! Shh... it's completely anonymous.</p>
        <p className="mt-2 text-xs font-bold text-rose-600">{3 - crushes.length} picks remaining today.</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search students..." 
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-900 focus:border-pink-500 outline-none transition"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {searchTerm && filteredUsers.map(user => (
          <div key={user.id} className="glass-card p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.department} • {user.year}</p>
              </div>
            </div>
            <button 
              onClick={() => handlePickCrush(user)}
              disabled={crushes.includes(user.id)}
              className={`p-2 rounded-full transition ${crushes.includes(user.id) ? 'bg-rose-500 text-white' : 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/40'}`}
            >
              <Heart className={`w-5 h-5 ${crushes.includes(user.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

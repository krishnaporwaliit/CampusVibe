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
    async function fetchUsers() {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const fetched = [];
      snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          fetched.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsers(fetched);
    }
    fetchUsers();
  }, [currentUser.uid]);

  const handlePickCrush = async (user) => {
    if (crushes.length >= 3) return alert('You can only pick 3 crushes per day!');
    
    const crushRef = doc(db, 'crushes', `${currentUser.uid}_${user.id}`);
    await setDoc(crushRef, {
      from: currentUser.uid,
      to: user.id,
      date: new Date().toISOString().split('T')[0],
      matched: false
    });
    
    setCrushes([...crushes, user]);
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-6 rounded-2xl border border-pink-500/20">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Heart className="text-pink-500" /> Anonymous Crush
        </h2>
        <p className="text-sm text-gray-300">Pick up to 3 people you have a crush on. If they pick you too, it's a match! Shh... it's completely anonymous.</p>
        <p className="mt-2 text-xs font-bold text-pink-400">{3 - crushes.length} picks remaining today.</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search students..." 
          className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-pink-500 outline-none transition"
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
                <p className="text-xs text-gray-400">{user.department} • {user.year}</p>
              </div>
            </div>
            <button 
              onClick={() => handlePickCrush(user)}
              className="p-2 bg-pink-500/20 text-pink-500 rounded-full hover:bg-pink-500/40 transition"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

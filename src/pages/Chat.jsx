import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Chat() {
  const [matches, setMatches] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, we fetch users directly to mock matches.
    // In a real app, query 'matches' collection where users array contains currentUser.uid
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = [];
      snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          fetched.push({ id: doc.id, ...doc.data() });
        }
      });
      setMatches(fetched.slice(0, 3)); // Mock 3 matches
    });
    return () => unsubscribe();
  }, [currentUser.uid]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
        {matches.map(match => (
          <div key={`story-${match.id}`} className="flex flex-col items-center flex-shrink-0 cursor-pointer" onClick={() => navigate(`/chat/${match.id}`)}>
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-purple-500">
              <img src={match.photoURL} alt={match.name} className="w-full h-full rounded-full border-2 border-[#0F0A1A] object-cover" />
            </div>
            <span className="text-xs mt-1 font-medium">{match.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mt-4">
        {matches.map(match => (
          <div 
            key={match.id} 
            onClick={() => navigate(`/chat/${match.id}`)}
            className="glass-card p-3 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition"
          >
            <img src={match.photoURL} alt={match.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-sm">{match.name}</h3>
              <p className="text-xs text-gray-400 truncate">Hey, how are you doing?</p>
            </div>
            <div className="text-[10px] text-gray-500">2m ago</div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/blind-chat')}
        className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-3">
          <MessageCircle className="text-white w-6 h-6" />
          <div className="text-left">
            <h3 className="font-bold text-white">Blind Chat</h3>
            <p className="text-xs text-indigo-200">Chat anonymously with someone new</p>
          </div>
        </div>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white">Join</span>
      </button>
    </div>
  );
}

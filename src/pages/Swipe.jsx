import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { collection, query, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Swipe() {
  const [cards, setCards] = useState([]);
  const { currentUser } = useAuth();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const fetched = [];
      snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          fetched.push({ id: doc.id, ...doc.data() });
        }
      });
      // In real app: filter out already swiped
      setCards(fetched);
    }
    fetchCards();
  }, [currentUser.uid]);

  const handleSwipe = async (direction, user) => {
    setCards(prev => prev.filter(c => c.id !== user.id));
    
    if (direction === 'right') {
      const likeRef = doc(db, 'likes', `${currentUser.uid}_${user.id}`);
      await setDoc(likeRef, { from: currentUser.uid, to: user.id, timestamp: serverTimestamp() });
      
      // Check mutual like (mock logic here, ideally done via cloud function or better transaction)
      // For demo, occasionally show match randomly if they liked
      if (Math.random() > 0.5) {
        const matchId = [currentUser.uid, user.id].sort().join('_');
        await setDoc(doc(db, 'matches', matchId), {
          users: [currentUser.uid, user.id],
          timestamp: serverTimestamp()
        });
        setMatch(user);
      }
    }
  };

  if (cards.length === 0) return <div className="text-center mt-20 text-gray-400">No more profiles to swipe!</div>;

  return (
    <div className="relative h-[calc(100vh-140px)] flex flex-col items-center justify-center">
      <AnimatePresence>
        {cards.map((card, i) => {
          if (i !== 0) return null; // Only render top card for now
          return <SwipeCard key={card.id} user={card} onSwipe={handleSwipe} />;
        })}
      </AnimatePresence>
      
      {match && (
        <div className="fixed inset-0 bg-pink-600/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate-bounce">It's a Match! 💕</h1>
          <img src={match.photoURL} alt="Match" className="w-40 h-40 rounded-full border-4 border-white mb-6" />
          <p className="text-xl text-white mb-8">You and {match.name} liked each other.</p>
          <button onClick={() => setMatch(null)} className="bg-white text-pink-600 font-bold py-3 px-8 rounded-full">
            Keep Swiping
          </button>
        </div>
      )}
    </div>
  );
}

function SwipeCard({ user, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) onSwipe('right', user);
    else if (info.offset.x < -100) onSwipe('left', user);
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className="absolute w-full max-w-sm aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl cursor-grab"
    >
      <img src={user.photoURL || 'https://via.placeholder.com/400x600'} alt={user.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
        <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
        <p className="text-pink-400 mb-2">{user.department} • {user.year}</p>
        <p className="text-gray-300 text-sm line-clamp-3">{user.bio}</p>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between gap-4">
        <button onClick={() => onSwipe('left', user)} className="w-14 h-14 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-lg pointer-events-auto hover:bg-gray-700 transition">
          <X className="w-6 h-6" />
        </button>
        <button onClick={() => onSwipe('right', user)} className="w-14 h-14 bg-gray-800/80 backdrop-blur rounded-full flex items-center justify-center text-green-500 shadow-lg pointer-events-auto hover:bg-gray-700 transition">
          <Heart className="w-6 h-6 fill-current" />
        </button>
      </div>
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

export default function RatingModal({ user, onClose, onSubmit }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-sm overflow-hidden relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white z-10 hover:bg-black/60 transition">
            <X className="w-5 h-5" />
          </button>
          
          <div className="aspect-square relative">
            <img src={user.photoURL || 'https://via.placeholder.com/400'} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A1A] via-transparent to-transparent" />
          </div>
          
          <div className="p-6 text-center -mt-10 relative z-10">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.department} • {user.year}</p>
            <p className="text-sm text-gray-600 italic mb-6">"{user.bio || 'No bio yet'}"</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredStar || selectedStar) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-600'
                    }`} 
                  />
                </motion.button>
              ))}
            </div>
            
            <button 
              disabled={!selectedStar}
              onClick={() => onSubmit(selectedStar)}
              className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-opacity"
            >
              Submit Rating
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

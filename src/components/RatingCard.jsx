import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function RatingCard({ user, onClick }) {
  const rating = user.averageRating || 0;
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-800">
        <img 
          src={user.photoURL || 'https://via.placeholder.com/300'} 
          alt={user.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
          <h3 className="font-bold text-gray-900 text-sm truncate">{user.name}</h3>
          <p className="text-xs text-gray-600">{user.department} • {user.year}</p>
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-col items-center">
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
            />
          ))}
          <span className="text-xs font-bold ml-1">{rating.toFixed(1)}</span>
        </div>
        <p className="text-[10px] text-gray-500">
          rated by {user.ratingCount || 0} people
        </p>
      </div>
    </motion.div>
  );
}

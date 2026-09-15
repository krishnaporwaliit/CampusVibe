import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Trash2, Edit2, Shield, Settings, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!userProfile) return null;

  return (
    <div className="space-y-6 pb-6">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl -mx-4 -mt-4"></div>
        <div className="absolute -bottom-12 left-4 flex items-end gap-4">
          <div className="relative">
            <img src={userProfile.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-[#0F0A1A] object-cover bg-gray-800" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white border-2 border-[#0F0A1A]">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-14 px-2">
        <h2 className="text-2xl font-bold">{userProfile.name}</h2>
        <p className="text-gray-400">{userProfile.department} • {userProfile.year}</p>
        <p className="mt-3 text-sm text-gray-300">{userProfile.bio || 'Add a bio to tell people about yourself!'}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{userProfile.averageRating?.toFixed(1) || '0.0'}</div>
          <div className="text-xs text-gray-400">Average Rating</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">{userProfile.ratingCount || '0'}</div>
          <div className="text-xs text-gray-400">Total Ratings</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Preferences</h3>
        
        <div className="glass-card flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Dating Features</span>
          </div>
          <div className="w-11 h-6 bg-pink-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="glass-card flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-purple-500" />
            <span>Blind Chat Opt-in</span>
          </div>
          <div className="w-11 h-6 bg-purple-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Account</h3>
        
        <button className="w-full glass-card flex items-center gap-3 p-4 hover:bg-white/10 transition text-left">
          <Settings className="w-5 h-5 text-gray-400" />
          <span>Settings</span>
        </button>
        
        <button onClick={handleLogout} className="w-full glass-card flex items-center gap-3 p-4 hover:bg-white/10 transition text-left text-red-400">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
        
        <button className="w-full glass-card flex items-center gap-3 p-4 hover:bg-red-500/20 transition text-left text-red-500">
          <Trash2 className="w-5 h-5" />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
}

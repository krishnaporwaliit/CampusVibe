import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Flame, Heart, MessageCircle, User, Bell } from 'lucide-react';

export default function Layout() {
  return (
    <div className="pb-16 min-h-screen bg-[#0F0A1A]">
      <header className="sticky top-0 z-50 bg-[#0F0A1A]/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          CampusVibe
        </h1>
        <button className="p-2 bg-white/5 rounded-full relative">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1025]/90 backdrop-blur-lg border-t border-white/10 flex justify-around p-3 z-50 pb-safe">
        <NavItem to="/" icon={<Home />} label="Home" />
        <NavItem to="/swipe" icon={<Flame />} label="Swipe" />
        <NavItem to="/crush" icon={<Heart />} label="Crush" />
        <NavItem to="/chat" icon={<MessageCircle />} label="Chat" />
        <NavItem to="/profile" icon={<User />} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center p-2 rounded-xl transition-all ${
          isActive ? 'text-pink-500' : 'text-gray-400 hover:text-white'
        }`
      }
    >
      {React.cloneElement(icon, { className: 'w-6 h-6 mb-1' })}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}

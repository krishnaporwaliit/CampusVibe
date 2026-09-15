import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Flame, Heart, MessageCircle, User, Bell } from 'lucide-react';

export default function Layout() {
  return (
    <div className="pb-16 min-h-screen bg-[#FFFDFB]">
      <header className="sticky top-0 z-50 bg-[#FFFDFB]/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">
          CampusVibe
        </h1>
        <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around p-3 z-50 pb-safe">
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
          isActive ? 'text-rose-500' : 'text-gray-500 hover:text-gray-900'
        }`
      }
    >
      {React.cloneElement(icon, { className: 'w-6 h-6 mb-1' })}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}

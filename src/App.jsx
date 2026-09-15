import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Home from './pages/Home';
import Swipe from './pages/Swipe';
import Crush from './pages/Crush';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRoom';
import BlindChat from './pages/BlindChat';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (!currentUser.emailVerified) return <Navigate to="/verify-email" />;
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="swipe" element={<Swipe />} />
            <Route path="crush" element={<Crush />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:chatId" element={<ChatRoom />} />
            <Route path="blind-chat" element={<BlindChat />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFFDFB]">
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        
        {error && <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">College Email</label>
            <input
              type="email"
              required
              className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-rose-500 transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@college.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-rose-500 transition-colors"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            type="submit"
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Need an account? <Link to="/signup" className="text-rose-600 hover:text-rose-700 font-medium">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

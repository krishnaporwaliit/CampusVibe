import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    department: 'CS', year: '1st', gender: 'Other', bio: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      const { email, password, ...profileData } = formData;
      await signup(email, password, { ...profileData, photoURL: 'https://via.placeholder.com/150' });
      navigate('/verify-email');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-8 flex items-center justify-center px-4 bg-[#FFFDFB]">
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
          Join CampusVibe
        </h2>
        
        {error && <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input type="text" name="name" required className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-2 text-gray-900" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">College Email (.edu / .ac.in)</label>
            <input type="email" name="email" required className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-2 text-gray-900" value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input type="password" name="password" required className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-2 text-gray-900" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Confirm</label>
              <input type="password" name="confirmPassword" required className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-2 text-gray-900" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Dept</label>
              <select name="department" className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-2 py-2 text-gray-900" value={formData.department} onChange={handleChange}>
                {['CS','ECE','EEE','Mech','Civil','Chem','Bio','Other'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
              <select name="year" className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-2 py-2 text-gray-900" value={formData.year} onChange={handleChange}>
                {['1st','2nd','3rd','4th'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
              <select name="gender" className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-2 py-2 text-gray-900" value={formData.gender} onChange={handleChange}>
                {['Male','Female','Other'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
            <textarea name="bio" maxLength="200" rows="2" className="w-full bg-white border border-gray-200 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-2 text-gray-900" value={formData.bio} onChange={handleChange}></textarea>
          </div>

          <button disabled={loading} className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white font-bold py-3 rounded-xl transition-all" type="submit">
            Sign Up
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-rose-600 hover:text-rose-700">Log In</Link>
        </div>
      </div>
    </div>
  );
}

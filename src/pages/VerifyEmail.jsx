import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmail() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          clearInterval(interval);
          navigate('/');
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentUser, navigate]);

  const resendEmail = async () => {
    try {
      if (currentUser) {
        await sendEmailVerification(currentUser);
        setMessage('Verification email sent again!');
      }
    } catch (err) {
      setMessage('Error sending email: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-card max-w-md text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification email to <strong>{currentUser?.email}</strong>. 
          Please click the link in the email to verify your account.
        </p>
        <div className="animate-pulse flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <button 
          onClick={resendEmail}
          className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 py-2 px-6 rounded-xl transition"
        >
          Resend Email
        </button>
        {message && <p className="mt-4 text-sm text-rose-600">{message}</p>}
      </div>
    </div>
  );
}

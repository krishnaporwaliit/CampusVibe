import React, { useState } from 'react';
import { Eye, EyeOff, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BlindChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! First time doing blind chat?", sender: 'other' },
    { id: 2, text: "Yeah! It's kind of exciting.", sender: 'me' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me' }]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-[#FFFDFB] z-50 flex flex-col">
      <header className="bg-indigo-900/40 backdrop-blur-md p-4 flex items-center justify-between border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white">
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center overflow-hidden">
              {revealed ? (
                <img src="https://via.placeholder.com/150" alt="Revealed" className="w-full h-full object-cover" />
              ) : (
                <EyeOff className="w-5 h-5 text-indigo-300" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-sm text-gray-900">{revealed ? "Alex Smith" : "Anonymous"}</h2>
              <p className="text-[10px] text-indigo-300">23h 59m remaining</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setRevealed(true)}
          className="text-xs bg-indigo-500 hover:bg-indigo-600 text-gray-900 px-3 py-1.5 rounded-full transition flex items-center gap-1"
        >
          <Eye className="w-3 h-3" /> Reveal
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-3 pb-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0F0A1A] to-[#0F0A1A]">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-gray-900 rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </main>
      
      <footer className="p-4 bg-white border-t border-indigo-500/20">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Whisper something..."
            className="flex-1 bg-black/40 border border-indigo-500/30 rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button type="submit" className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-gray-900 hover:bg-indigo-700 transition">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}

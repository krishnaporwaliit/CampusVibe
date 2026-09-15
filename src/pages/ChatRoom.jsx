import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Send } from 'lucide-react';

export default function ChatRoom() {
  const { chatId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUser, setChatUser] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function fetchUser() {
      const snap = await getDoc(doc(db, 'users', chatId));
      if (snap.exists()) setChatUser(snap.data());
    }
    fetchUser();
    
    // Mocking messages for demo, normally query messages subcollection of the match
    const q = query(collection(db, `chats/${chatId}/messages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: newMessage,
      senderId: currentUser.uid,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 bg-[#FFFDFB] z-50 flex flex-col">
      <header className="bg-white backdrop-blur-md p-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white">
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        {chatUser && (
          <>
            <img src={chatUser.photoURL} alt={chatUser.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h2 className="font-bold text-sm text-gray-900">{chatUser.name}</h2>
              <p className="text-[10px] text-green-400">Online</p>
            </div>
          </>
        )}
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.uid;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${isMe ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-gray-900 rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </main>
      
      <footer className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black/40 border border-gray-100 rounded-full px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-pink-500"
          />
          <button type="submit" className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-gray-900 hover:bg-rose-600 transition">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}

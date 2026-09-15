import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyChGh0ih5JrByepiWn2B9hN6y81nk-k3eE',
  authDomain: 'campusvibe-app-kp2026.firebaseapp.com',
  projectId: 'campusvibe-app-kp2026',
  storageBucket: 'campusvibe-app-kp2026.firebasestorage.app',
  messagingSenderId: '652372123730',
  appId: '1:652372123730:web:267d964602424a05b9bf8b',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

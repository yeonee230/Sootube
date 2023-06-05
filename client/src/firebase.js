import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCOHhzDTzsg9c9CmKlWWRUQ1d14ULVEauo',
  authDomain: 'sootube-fe012.firebaseapp.com',
  projectId: 'sootube-fe012',
  storageBucket: 'sootube-fe012.appspot.com',
  messagingSenderId: '818914610822',
  appId: '1:818914610822:web:c7b76f5af7d2dd081c0b07',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

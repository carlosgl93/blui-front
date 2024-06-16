import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCFFGtQ8UCPXendLYZc0koY2X2xqCqg4D8',
  authDomain: 'blui-6ec33.firebaseapp.com',
  projectId: 'blui-6ec33',
  storageBucket: 'blui-6ec33.appspot.com',
  messagingSenderId: '612874412823',
  appId: '1:612874412823:web:fbfd0f29b5b53450e8cd52',
  measurementId: 'G-QWQ7SXL2SW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, 'blui');
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const functions = getFunctions(app);

// Check if window is defined before initializing Firebase Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

if (import.meta.env.VITE_ENV === 'dev') {
  console.log('connecting to emulators');
  connectAuthEmulator(auth, 'http://localhost:9099/auth');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
export const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

console.log(import.meta.env.MODE);

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, 'blui');
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
functions.region = 'southamerica-west1';

// Check if window is defined before initializing Firebase Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

if (import.meta.env.VITE_ENV === 'dev') {
  console.log('connecting to emulators');
  connectAuthEmulator(auth, 'http://localhost:9099/auth');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

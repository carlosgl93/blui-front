import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process?.env?.FIREBASE_API_KEY || import.meta.env.FIREBASE_API_KEY;
const authDomain = process?.env?.FIREBASE_AUTH_DOMAIN || import.meta.env.FIREBASE_AUTH_DOMAIN;
const projectId = process?.env?.FIREBASE_PROJECT_ID || import.meta.env.FIREBASE_PROJECT_ID;
const storageBucket =
  process?.env?.FIREBASE_STORAGE_BUCKET || import.meta.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId =
  process?.env?.FIREBASE_MESSAGING_SENDER_ID || import.meta.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process?.env?.FIREBASE_APP_ID || import.meta.env.FIREBASE_APP_ID;
const measurementId =
  process?.env?.FIREBASE_MEASUREMENT_ID || import.meta.env.FIREBASE_MEASUREMENT_ID;

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

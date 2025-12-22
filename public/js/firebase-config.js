// Firebase configuration for client-side
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYXwGpXUr1A0oDFvJkB7D75Az6ZvLJ1fA",
  authDomain: "sakenyitdl.firebaseapp.com",
  projectId: "sakenyitdl",
  storageBucket: "sakenyitdl.firebasestorage.app",
  messagingSenderId: "539321065353",
  appId: "1:539321065353:web:ca30cdc51899d86949cb58",
  measurementId: "G-YWZ767MGLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export for use in other files
export { db, auth, analytics };

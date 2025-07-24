import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "componentcraft-ai-hj8xj",
  "appId": "1:955440527139:web:9ad53d15a59940db26be96",
  "storageBucket": "componentcraft-ai-hj8xj.firebasestorage.app",
  "apiKey": "AIzaSyAsLbZpSV17DT0oibEfA5tOrtFJuk3-me8",
  "authDomain": "componentcraft-ai-hj8xj.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "955440527139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

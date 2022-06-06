import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATT4vygSK2Pqwk6dMByKnsdCI0e311E5o",
  authDomain: "ludhic-94c93.firebaseapp.com",
  databaseURL: "https://ludhic-94c93-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ludhic-94c93",
  storageBucket: "ludhic-94c93.appspot.com",
  messagingSenderId: "38465712269",
  appId: "1:38465712269:web:ba5258d2a393815a5472c4"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

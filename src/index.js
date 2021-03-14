import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD-5wEkpa8EWB3aA6uexHqnMa3uuWVhzm4",
    authDomain: "web-messenger-ffd8f.firebaseapp.com",
    projectId: "web-messenger-ffd8f",
    storageBucket: "web-messenger-ffd8f.appspot.com",
    messagingSenderId: "537030510345",
    appId: "1:537030510345:web:41c61350a35a872d8eb5d8",
    measurementId: "G-FTW19XPG19"
  };


firebase.initializeApp(firebaseConfig);



window.store=store;
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

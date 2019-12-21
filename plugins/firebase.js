import firebase from 'firebase/app'
import 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9mJD8l5d0XW0CHRn8GZUoIVIggWrae5Y',
  authDomain: 'aikon-eaf3a.firebaseapp.com',
  databaseURL: 'https://aikon-eaf3a.firebaseio.com',
  projectId: 'aikon-eaf3a',
  storageBucket: 'aikon-eaf3a.appspot.com',
  messagingSenderId: '1031502130478',
  appId: '1:1031502130478:web:551f7f73cdc8b797fadebf',
  measurementId: 'G-S017VC36Y1'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

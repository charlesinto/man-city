import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBaQY6xmlegrkBayl4P4z_QVXcKfBVSz7M",
    authDomain: "man-city-a67e8.firebaseapp.com",
    databaseURL: "https://man-city-a67e8.firebaseio.com",
    projectId: "man-city-a67e8",
    storageBucket: "man-city-a67e8.appspot.com",
    messagingSenderId: "645239253444"
  };

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export {
  firebaseMatches

}
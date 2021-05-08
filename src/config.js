import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpw25QWGY7-8y-N3jrUzFbFNm-ebV0aks",
    authDomain: "imagerepo-d5f23.firebaseapp.com",
    projectId: "imagerepo-d5f23",
    storageBucket: "imagerepo-d5f23.appspot.com",
    messagingSenderId: "508284694383",
    appId: "1:508284694383:web:b0f826230324472732029a",
    measurementId: "G-MBK5SJ8EEE"
};

const fire = firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();

let firebase_resources = [fire, projectStorage, projectFireStore]

export default firebase_resources;

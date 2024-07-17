import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD61LZ5AgzYg8c6F43ks1R0n7zXuqqLNR8",
    authDomain: "practica-firebase-20200248.firebaseapp.com",
    projectId: "practica-firebase-20200248",
    storageBucket: "practica-firebase-20200248.appspot.com",
    messagingSenderId: "66885422760",
    appId: "1:66885422760:web:63e60ba78b684444fbfc9d"
};

console.log("Valor de la configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtén referencias a los servicios que necesitas
const auth = getAuth(app);

const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage };
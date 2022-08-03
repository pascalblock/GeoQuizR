import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "mefowe-b56d1.firebaseapp.com",
  projectId: "mefowe-b56d1",
  storageBucket: "mefowe-b56d1.appspot.com",
  messagingSenderId: "918345827213",
  appId: "1:918345827213:web:306cdca8694e1ba92673c4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const user = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userFirebase) => {
        unsubscribe();
        resolve(userFirebase);
      },
      reject
    );
  });
};

export { db, auth, user };

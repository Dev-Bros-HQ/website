import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirebaseContext = React.createContext();

function FirebaseProvider({ children }) {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const getMW2Builds = async (db) => {
      const buildsRef = collection(db, "mw2-builds");
      const buildsSnapshot = await getDocs(buildsRef);
      const buildsList = buildsSnapshot.docs.map((doc) => doc.data());
      setBuilds(buildsList);
    };

    getMW2Builds(db);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        builds,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

export { FirebaseProvider, useFirebase };

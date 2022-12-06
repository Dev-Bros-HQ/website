import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMW2Builds,
  getMW2Attachments,
  getMW2Guns,
  createMW2Build,
  createMW2Attachment,
} from "./firebaseActions";

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
  const [attachments, setAttachments] = useState([]);
  const [guns, setGuns] = useState([]);

  useEffect(() => {
    getMW2Builds(db, setBuilds);
    getMW2Attachments(db, setAttachments);
    getMW2Guns(db, setGuns);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        builds,
        attachments,
        guns,
        createMW2Build: (values, callback) =>
          createMW2Build(db, values, callback),
        createMW2Attachment: (values, attachmentType, callback) =>
          createMW2Attachment(db, values, attachmentType, callback),
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

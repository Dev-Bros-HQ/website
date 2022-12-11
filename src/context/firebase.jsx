import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getUser,
  getMW2Builds,
  getMW2Attachments,
  getMW2Guns,
  createMW2Build,
  createMW2Attachment,
  createDatabaseDocument,
} from "./firebaseActions";
import { useAuthState } from "react-firebase-hooks/auth";

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
const auth = getAuth(app);

const FirebaseContext = React.createContext();

function FirebaseProvider({ children }) {
  const [builds, setBuilds] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [guns, setGuns] = useState([]);
  const [userInformation, setUserInformation] = useState({});
  const [user, loading, error] = useAuthState(auth);

  const getUserInformation = async (id) => {
    await getUser(db, id, setUserInformation);
  };

  useEffect(() => {
    getMW2Builds(db, setBuilds);
    getMW2Attachments(db, setAttachments);
    getMW2Guns(db, setGuns);
  }, []);

  useEffect(() => {
    if (user && userInformation.uid !== user.uid && user.uid) {
      getUserInformation(user.uid);
    }
  }, [user, loading]);

  const createDocument = async (collectionName, data, id, idPrefix) => {
    return await createDatabaseDocument(db, collectionName, data, id, idPrefix);
  };

  return (
    <FirebaseContext.Provider
      value={{
        db,
        auth,
        authState: { user: { ...user, ...userInformation }, loading, error },
        builds,
        attachments,
        guns,
        createDocument,
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

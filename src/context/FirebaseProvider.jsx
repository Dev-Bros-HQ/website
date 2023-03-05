import React, { useState } from "react";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { getUser } from "./firebaseActions";
import { app, auth, db } from "./firebaseConfig";

const FirebaseContext = React.createContext();

function FirebaseProvider({ children }) {
  const [user, setUser] = useState();

  useEffectOnce(() => {
    console.log("subscribing to auth changes");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in.
        const userData = await getUser(db, user.uid);
        setUser({ ...user, ...userData });
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => {
      console.log("unsubscribing to auth changes");
      return unsubscribe();
    };
  });

  return (
    <FirebaseContext.Provider
      value={{
        app,
        user,
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

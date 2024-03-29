import React, { useState } from "react";
import { useEffectOnce } from "../hooks/useEffectOnce";
import {
  getProject,
  getProjects,
  getUser,
  getUsers,
  getDocumentByPath,
  getContributors,
  getBlogPosts,
  updateBlogPost,
  getBlogPost,
  deleteBlogPost,
} from "./firebaseActions";
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
        getUsers: (callback) => getUsers(db, callback),
        getUser: (uid) => getUser(db, uid),
        getProjects: (callback) => getProjects(db, callback),
        getProject: (name, callback) => getProject(db, name, callback),
        getDocumentByPath: (document, collection, callback) =>
          getDocumentByPath(db, document, collection, callback),
        getContributors: (contributors, callback) =>
          getContributors(db, contributors, callback),
        getBlogPosts: (callback, authorId) =>
          getBlogPosts(db, callback, authorId),
        getBlogPost: (slug, callback) => getBlogPost(db, slug, callback),
        updateBlogPosts: (data, callback) => updateBlogPost(db, data, callback),
        deleteBlogPost: (blogId, callback) =>
          deleteBlogPost(db, blogId, callback),
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

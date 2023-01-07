import React, { useState, useEffect } from "react";
import { getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMW2Builds,
  getMW2Attachments,
  getMW2Guns,
  createMW2Build,
  getMW2Build,
} from "./firebaseActions";

const MW2Context = React.createContext();

function MW2Provider({ children }) {
  const [builds, setBuilds] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [guns, setGuns] = useState([]);
  const attachmentTypes = [
    "Muzzle",
    "Barrel",
    "Underbarrel",
    "Laser",
    "Optic",
    "Stock",
    "Comb",
    "Rear Grip",
    "Bolt",
    "Guard",
    "Magazine",
    "Ammunition",
  ];

  const app = getApp();
  const db = getFirestore(app);

  const getBuild = (id, callback) => getMW2Build(db, id, callback);

  const createBuild = (values, callback) =>
    createMW2Build(db, values, callback);

  const getAttachments = async () => {
    const allAttachments = {};
    for (let a = 0; a < attachmentTypes.length; a += 1) {
      allAttachments[`${attachmentTypes[a].toLowerCase()}`] =
        await getMW2Attachments(db, attachmentTypes[a].toLowerCase());
    }
    setAttachments(allAttachments);
    return allAttachments;
  };

  const getBuilds = async () => {
    await getMW2Builds(db, setBuilds);
  };

  const getGuns = async () => {
    await getMW2Guns(db, setGuns);
  };

  return (
    <MW2Context.Provider
      value={{
        builds,
        getBuild,
        getBuilds,
        createBuild,
        attachments,
        getAttachments,
        guns,
        getGuns,
      }}
    >
      {children}
    </MW2Context.Provider>
  );
}

function useMW2() {
  const context = React.useContext(MW2Context);
  if (context === undefined) {
    throw new Error("useMW2 must be used within a MW2Provider");
  }
  return context;
}

export { MW2Provider, useMW2 };

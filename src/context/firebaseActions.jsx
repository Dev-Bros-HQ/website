import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { generateUUID } from "../helpers";

export const getMW2Builds = async (db, callback) => {
  const buildsRef = collection(db, "mw2-builds");
  const buildsSnapshot = await getDocs(buildsRef);
  const buildsList = buildsSnapshot.docs.map((doc) => doc.data());
  callback(buildsList);
};

export const getMW2Attachments = async (db, attachmentType) => {
  const attachmentsRef = collection(db, `mw2-${attachmentType}`);
  const attachmentsSnapshot = await getDocs(attachmentsRef);
  const attachmentsList = attachmentsSnapshot.docs.map((doc) => doc.data());
  return attachmentsList;
};

export const getMW2Guns = async (db, callback) => {
  const gunsRef = collection(db, "mw2-guns");
  const gunsSnapshot = await getDocs(gunsRef);
  const returnValue = {};
  gunsSnapshot.docs.forEach((doc) => {
    returnValue[doc.id] = doc.data();
  });
  callback(returnValue);
};

export const createMW2Build = async (db, values, callback) => {
  const buildUUID = generateUUID("build");

  //TODO: SUBMIT REAL DATA INSTEAD OF THIS MOCK BS ↓
  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(values.createdAt),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: "foo",
      },
    },
  };
  await setDoc(doc(db, "mw2-builds", buildUUID), docData).then((ref) => {
    callback();
  });
};

export const getUser = async (db, uid, callback) => {
  if (!uid) console.warn("NO UID PRESENT");
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const doc = await getDocs(q);
  const userInfo = doc.docs[0].data();
  callback(userInfo);
};

export const createDatabaseDocument = async (
  db,
  collectionName,
  data,
  id,
  idPrefix
) => {
  const generatedID = id || generateUUID(idPrefix || "");

  return await setDoc(doc(db, collectionName, generatedID), data)
    .then(() => {
      return { success: true, error: null };
    })
    .catch((err) => {
      return { success: null, error: err };
    });
};

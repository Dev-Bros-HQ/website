import {
  collection,
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

export const getMW2Attachments = async (db, callback) => {
  const attachmentsRef = collection(db, "mw2-attachments");
  const attachmentsSnapshot = await getDocs(attachmentsRef);
  const returnValue = {};
  attachmentsSnapshot.docs.forEach((doc) => {
    const attachmentType = doc.id.split("-")[0];
    returnValue[attachmentType] = returnValue[attachmentType] || [];
    returnValue[attachmentType].push({ id: doc.id, ...doc.data() });
  });
  callback(returnValue);
};

export const getMW2Guns = async (db, callback) => {
  const gunsRef = collection(db, "mw2-guns");
  const gunsSnapshot = await getDocs(gunsRef);
  const returnValue = {};
  gunsSnapshot.docs.forEach((doc) => {
    returnValue[doc.id] = doc.data();
  });
  console.log({ returnValue });
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
  console.log({ docData });
  await setDoc(doc(db, "mw2-builds", buildUUID), docData).then((ref) => {
    console.log(ref);
    callback();
  });
};

export const createMW2Attachment = async (
  db,
  values,
  attachmentType,
  callback
) => {
  const buildUUID = generateUUID(attachmentType);

  //TODO: SUBMIT REAL DATA INSTEAD OF THIS MOCK BS ↓
  const docData = {
    stringExample: "Cool Attachment",
    attachmentType,
    createdAt: Timestamp.fromDate(values.createdAt),
  };
  console.log({ docData });
  await setDoc(doc(db, "mw2-attachments", buildUUID), docData).then((ref) => {
    console.log(ref);
    callback();
  });
};

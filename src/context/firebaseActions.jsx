import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { generateUUID } from "../helpers";

export const getMW2Builds = async (db, callback) => {
  const buildsRef = collection(db, "mw2-builds");
  const buildsSnapshot = await getDocs(buildsRef);
  const buildsList = buildsSnapshot.docs.map((doc) => doc.data());
  callback(buildsList);
};
export const getMW2Build = async (db, id, callback) => {
  const buildRef = doc(db, `mw2-builds`, id);
  const buildSnapshot = await getDoc(buildRef);
  callback(buildSnapshot.data());
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

  const docData = {
    id: buildUUID,
    ...values, //taking the value object and applying to doc data
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
  if (!callback) {
    return userInfo;
  }
  callback(userInfo);
};

export const getUsers = async (db, callback) => {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  callback(usersList);
};

export const getContributors = async (db, contributors, callback) => {
  if (!contributors) {
    return;
  }
  const contributorPromises = await Promise.all(
    contributors?.map(({ user }) => getDocumentByPath(db, "users", user.id))
  );

  const filteredContributors = contributorPromises.map((user) => {
    const { photoUrl, firstName, lastName, displayName, key } = user;
    const notes = contributors.filter((contributor) => {
      return contributor.user.id === key;
    })[0].notes;
    return { photoUrl, firstName, lastName, displayName, notes };
  });

  if (!callback) {
    return filteredContributors;
  }
  callback(filteredContributors);
};

export const getProjects = async (db, callback) => {
  const usersRef = collection(db, "projects");
  const usersSnapshot = await getDocs(usersRef);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  callback(usersList);
};

export const getProject = async (db, name, callback) => {
  if (!name) console.warn("NO PROJECT NAME PRESENT");
  const q = query(collection(db, "projects"), where("name", "==", name));
  const doc = await getDocs(q);
  const projectInfo = doc.docs[0].data();
  if (!callback) {
    return projectInfo;
  }
  callback(projectInfo);
};

export const createDocument = async (collectionName, data, id, idPrefix) => {
  return await createDatabaseDocument(db, collectionName, data, id, idPrefix);
};

const createDatabaseDocument = async (
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

export const getDocumentByPath = async (db, document, collection, callback) => {
  if (!document || !collection) {
    console.warn("NO PATH PRESENT");
    return;
  }
  const docRef = doc(db, document, collection);
  const docSnapshot = await getDoc(docRef);
  if (!callback) {
    return docSnapshot.data();
  }
  callback(docSnapshot.data());
};

export const getBlogPosts = async (db, callback, authorId) => {
  const blogsRef = collection(db, "blogs");

  let blogsQuery = blogsRef;

  if (authorId) {
    // Filter blogs where the "author" field matches the author reference path
    blogsQuery = query(blogsRef, where("author_uid", "==", authorId));
  }

  const blogsSnapshot = await getDocs(blogsQuery);
  const blogsList = blogsSnapshot.docs.map((doc) => doc.data());

  const blogsWithAuthors = await Promise.all(
    blogsList.map(async (blog) => {
      const q = query(
        collection(db, "users"),
        where("key", "==", blog.author_uid)
      );
      const doc = await getDocs(q);
      const author = doc.docs[0].data();
      return { ...blog, author };
    })
  );

  if (!callback) {
    return blogsWithAuthors;
  }

  callback(blogsWithAuthors);
};

export const updateBlogPost = async (db, blog, callback) => {
  const blogUUID = blog?.id || generateUUID("blog");
  const authorRef = doc(
    db,
    "users",
    blog?.author?.author_uid || blog?.author?.key
  );
  const docData = {
    id: blogUUID,
    ...blog,
    author: authorRef,
  };

  if (!!blog?.id) {
    return await updateDoc(doc(db, "blogs", docData.id), docData).then(
      (ref) => {
        if (callback) {
          callback(ref);
        }
        return ref;
      }
    );
  }

  return await setDoc(doc(db, "blogs", docData.id), docData).then((ref) => {
    if (callback) {
      callback(ref);
    }
    return ref;
  });
};

export const getBlogPost = async (db, slug, callback) => {
  if (!slug) console.warn("NO BLOG SLUG PRESENT");
  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const doc = await getDocs(q);
  const blogInfo = doc.docs[0].data();
  const authorQ = query(
    collection(db, "users"),
    where("key", "==", blogInfo.author.id || blogInfo.author.key)
  );
  const authorDoc = await getDocs(authorQ);
  const author = authorDoc.docs[0].data();
  if (!callback) {
    return { ...blogInfo, author };
  }
  callback({ ...blogInfo, author });
};

export const deleteBlogPost = async (db, blogId, callback) => {
  if (!blogId) {
    console.warn("NO BLOG ID PRESENT");
    return;
  }

  const blogDocRef = doc(db, "blogs", blogId);

  try {
    await deleteDoc(blogDocRef);
    if (callback) {
      callback({ success: true, message: "Blog post deleted successfully." });
    }
    return { success: true, message: "Blog post deleted successfully." };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    if (callback) {
      callback({ success: false, message: "Error deleting blog post." });
    }
    return { success: false, message: "Error deleting blog post." };
  }
};

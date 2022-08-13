import functions from "firebase-functions";
import algoliasearch from "algoliasearch";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;
const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex("userIdeas");

const addToIndex = functions.firestore
  .document("users/{userId}/userIdeas/{docId}")
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return index.saveObject({ ...data, objectID });
  });

const updateIndex = functions.firestore
  .document("users/{userId}/userIdeas/{docId}")
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

const deleteFromIndex = functions.firestore
  .document("users/{userId}/userIdeas/{docId}")
  .onDelete((snapshot) => index.deleteObject(snapshot.id));

export { addToIndex, updateIndex, deleteFromIndex };

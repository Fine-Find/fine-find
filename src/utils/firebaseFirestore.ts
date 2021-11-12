import { db } from '@/config/firebase';
import {
  CollectionReference,
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from 'firebase/firestore';

export const getNextPostedCollectionNumber = async (
  postedCollection: CollectionReference<DocumentData>
) => {
  if (!postedCollection) {
    return 1;
  } else {
    const collectionSnapshot = await getDocs(postedCollection);

    const latestPostedCollection = collectionSnapshot.docs.reduce(function (
      previousDoc,
      currentDoc
    ) {
      const previousDocNumber = Number.parseInt(previousDoc.id);
      const currentDocNumber = Number.parseInt(currentDoc.id);

      return previousDocNumber > currentDocNumber ? previousDoc : currentDoc;
    });

    return Number.parseInt(latestPostedCollection.id) + 1;
  }
};

export const getPostedCollection = (userId: string) => {
  return collection(db, 'users', userId, 'collections');
};

export const createPostedCollection = async (data: any, userId: string) => {
  const postedCollection = getPostedCollection(userId);

  const postId = await getNextPostedCollectionNumber(postedCollection);
  const newPostDocRef = doc(postedCollection, postId.toString());

  const postData = data;
  postData.id = postId;

  return await setDoc(newPostDocRef, postData);
};

export const getPaginatedPostedCollection = async (
  collectionRef: CollectionReference<DocumentData>,
  lastDocumentInSnapshot?: QueryDocumentSnapshot<DocumentData>
) => {
  const pageSize = 25;
  let queryRef: Query<DocumentData>;
  if (!lastDocumentInSnapshot) {
    queryRef = query(collectionRef, orderBy('id', 'desc'), limit(pageSize));
  } else {
    queryRef = query(
      collectionRef,
      orderBy('id', 'desc'),
      startAfter(lastDocumentInSnapshot),
      limit(pageSize)
    );
  }

  const documentSnapshots = await getDocs(queryRef);

  let lastDocInQueriedSnapshot: QueryDocumentSnapshot<DocumentData>;
  const numberOfDocuments = documentSnapshots.docs.length;
  if (numberOfDocuments - 1 >= 0 && numberOfDocuments === pageSize) {
    lastDocInQueriedSnapshot =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
  }

  return {
    documentSnapshots,
    lastDocumentInSnapshot: lastDocInQueriedSnapshot,
  };
};

export const getPostedCollectionById = async (
  postId: string,
  userId: string
) => {
  const documentRef = doc(db, 'users', userId, 'collections', postId);
  return getDoc(documentRef);
};

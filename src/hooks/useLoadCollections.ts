import {
  getPaginatedPostedCollection,
  getPostedCollection,
} from '@/utils/firebaseFirestore';
import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@firebase/firestore';
import { useState } from 'react';

interface Response {
  collectionRef: CollectionReference<DocumentData>;
  documentSnapshots: QuerySnapshot<DocumentData>;
  lastDocumentInSnapshot?: QueryDocumentSnapshot<DocumentData>;
}

export type LoadCollection = {
  isLoading: boolean;
  collectionList: QueryDocumentSnapshot<DocumentData>[];
  hasMoreDocuments: boolean;
  error: Error;
  loadMore: () => Promise<void>;
};

export function useLoadCollection(userId: string): LoadCollection {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [hasMoreDocuments, setHasMoreDocuments] = useState(true);
  const [lastDocumentInSnapshot, setLastDocumentInSnapshot] = useState(null);
  const [collectionRef, setCollectionRef] = useState(null);
  const [error, setError] = useState<Error>();

  async function loadMore() {
    setIsLoading(true);
    try {
      const {
        collectionRef: newCollectionRef,
        documentSnapshots,
        lastDocumentInSnapshot: newLastDocumentInSnapshot,
      } = await loadPostedCollections(
        userId,
        collectionRef,
        lastDocumentInSnapshot
      );
      if (collectionRef === null) {
        setCollectionRef(newCollectionRef);
      }
      setCollectionList((current) => [...current, ...documentSnapshots.docs]);
      setHasMoreDocuments(
        newLastDocumentInSnapshot && newLastDocumentInSnapshot.exists()
      );
      setLastDocumentInSnapshot(newLastDocumentInSnapshot);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    collectionList,
    hasMoreDocuments,
    error,
    loadMore,
  };
}

// TODO: Add Error handling
async function loadPostedCollections(
  userId: string,
  collectionRef?: CollectionReference<DocumentData>,
  lastDocumentInSnapshot?: QueryDocumentSnapshot<DocumentData>
): Promise<Response> {
  const collectionReference = collectionRef ?? getPostedCollection(userId);
  const data = await getPaginatedPostedCollection(
    collectionReference,
    lastDocumentInSnapshot
  );
  return {
    collectionRef: collectionReference,
    documentSnapshots: data.documentSnapshots,
    lastDocumentInSnapshot: data.lastDocumentInSnapshot,
  };
}

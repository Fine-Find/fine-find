import { db } from '@/config/firebase';
import {
  BasicProfileType,
  BusinessProfileType,
  UserOnboarding,
  UserType,
} from '@/types/profile.types';
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
  updateDoc,
} from 'firebase/firestore';

export const getNextPostedCollectionNumber = async (
  postedCollection: CollectionReference<DocumentData>
) => {
  const collectionSnapshot = await getDocs(postedCollection);

  if (collectionSnapshot.docs && collectionSnapshot.docs.length > 0) {
    const latestPostedCollection = collectionSnapshot.docs.reduce(function (
      previousDoc,
      currentDoc
    ) {
      const previousDocNumber = Number.parseInt(previousDoc.id);
      const currentDocNumber = Number.parseInt(currentDoc.id);

      return previousDocNumber > currentDocNumber ? previousDoc : currentDoc;
    });

    return Number.parseInt(latestPostedCollection.id) + 1;
  } else {
    return 1;
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

const getUserDoc = async (userId: string) => {
  return doc(db, 'users', userId);
};

const getUserDocData = async (userId: string) => {
  const userDoc = await getUserDoc(userId);
  return getDoc(userDoc);
};

export const getUserDataField = async (userId: string, field: string) => {
  const userData = await getUserDocData(userId);

  return userData.get(field);
};

export const getUserData = async (userId: string) => {
  const userData = await getUserDocData(userId);
  return userData.data() as UserType;
};

export const getProfileData = async (userId: string) => {
  const userData = await getUserDocData(userId);
  const profile = {
    basicProfile: userData.get('basicProfile'),
    businessProfile: userData.get('businessProfile'),
    profileImage: userData.get('profileImage'),
    businessImage: userData.get('businessImage'),
  };

  return profile;
};
export const verifyDashboard = async (userId: string, router) => {
  const role = localStorage.getItem('role');

  if (role === 'admin') {
    router.push('/admin');
  } else if (role === 'designer') {
    router.push('/dashboard');
  } else {
    getUserDocData(userId)
      .then((userData) => {
        const basicProfile = userData.get('basicProfile');
        if (basicProfile?.role === 'admin') {
          localStorage.setItem('role', 'admin');
          router.push('/admin');
        }
        if (basicProfile?.role === 'designer') {
          localStorage.setItem('role', 'designer');
          router.push('/dashboard');
        }
      })
      .catch(() => {
        return false;
      });
  }
};

export const updateBasicProfile = async (
  userId: string,
  basicProfile: BasicProfileType
) => {
  const userDoc = await getUserDoc(userId);
  const name = `${basicProfile.firstName} ${basicProfile.lastName}`;
  const phone = basicProfile.phone ?? '';
  basicProfile.phone = phone;

  return await updateDoc(userDoc, { basicProfile, name });
};

export const updateBusinessProfile = async (
  userId: string,
  businessProfile: BusinessProfileType
) => {
  const userDoc = await getUserDoc(userId);

  return await updateDoc(userDoc, { businessProfile });
};

export const updateUserImage = async (
  userId: string,
  imageUrl: string,
  imageType: 'profile' | 'business'
) => {
  const userDoc = await getUserDoc(userId);

  if (imageType === 'profile') {
    return await updateDoc(userDoc, { profileImage: imageUrl });
  } else {
    return await updateDoc(userDoc, { businessImage: imageUrl });
  }
};

export const updateUserOnboarding = async (
  userId: string,
  onboarding: UserOnboarding
) => {
  const userDoc = await getUserDoc(userId);

  return await updateDoc(userDoc, { onboarding });
};

export const updateShopifyUrl = async (userId: string, url: string) => {
  const userDoc = await getUserDoc(userId);

  return await updateDoc(userDoc, { shopifyUrl: url });
};

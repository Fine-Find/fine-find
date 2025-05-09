import { db } from '@/config/firebase';
import {
  BasicProfileType,
  BusinessProfileType,
  UserOnboarding,
  UserType,
} from '@/types/profile.types';
import {
  RequestedProduct,
  RequestedProductDetails,
  Status,
} from '@/types/RequestedProducts';
import {
  CollectionReference,
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { v4 } from 'uuid';

import { notifyOwner } from './RequestedProductDenied';
import { fineFindApis } from './urls';

const allCollectionsQuery = query(collectionGroup(db, 'collections'));
const createRequestedProducts = (
  products: [RequestedProductDetails],
  collectionId: string,
  userId: string
) => {
  products.forEach((product) => {
    const newRequestedProduct: RequestedProduct = {
      ...product,
      collectionId,
      userId,
      requestedOn: new Date().toISOString(),
      status: Status.pending,
    };
    const productRef = doc(db, `requestedProducts/${product.id}`);
    setDoc(productRef, newRequestedProduct);
  });
};

export const getAllProductsRequested = async () => {
  const reqProductsCollection = collection(db, 'requestedProducts');
  const docs = (await getDocs(reqProductsCollection)).docs;
  const allDocs = docs.map((docdata, idx) => {
    return {
      ...docdata.data(),
      no: idx + 1,
    };
  });
  return allDocs;
};

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
export const getPosts = (userId: string) => {
  return collection(db, 'users', userId, 'posts');
};

export const createPostedCollection = async (data: any, userId: string) => {
  const postedCollection = getPostedCollection(userId);
  const postStats = getPosts(userId);

  const postId = v4();
  const newPostDocRef = doc(postedCollection, postId.toString());
  const statsRef = doc(postStats, '--stats--');

  const docSnap = await getDoc(statsRef);

  if (docSnap.exists()) {
    const { publishedPosts, unpublishedPosts } = docSnap.data();
    const statsData = {
      totalPosts: v4(),
      publishedPosts: publishedPosts ? publishedPosts : 0,
      unpublishedPosts: unpublishedPosts ? unpublishedPosts + 1 : 1,
    };
    await setDoc(statsRef, statsData, { merge: true });
  } else {
    await setDoc(statsRef, {}, { merge: true });
  }

  const queryAllCollections = await getDocs(allCollectionsQuery);

  const postData = data;
  postData.id = postId;
  postData.order = queryAllCollections.size ? queryAllCollections.size - 1 : 0;

  const createdD = await setDoc(newPostDocRef, postData);

  createRequestedProducts(data.productsRequested, newPostDocRef.id, userId);

  return createdD;
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

const getRequestedProductsByCollectionId = async (id) => {
  //  get all requested products by collectionId
  const requestedProducts = query(
    collection(db, 'requestedProducts'),
    where('collectionId', '==', id)
  );
  const requestedProductsSnapshot = await getDocs(requestedProducts);
  const requestedProductsData = requestedProductsSnapshot.docs.map((products) =>
    products.data()
  );
  return requestedProductsData;
};
export const getPostedCollectionById = async (
  postId: string,
  userId: string
) => {
  const documentRef = doc(db, 'users', userId, 'collections', postId);
  const data = await getDoc(documentRef);
  const requestedProduct = await getRequestedProductsByCollectionId(postId);
  return { data, requestedProduct };
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
    videoProductId: userData.get('videoProductId'),
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

export const updateShopifyUrl = async (
  userId: string,
  url: string,
  id?: string
) => {
  const userDoc = await getUserDoc(userId);

  return await updateDoc(userDoc, {
    shopifyUrl: url,
    videoProductId: id || null,
  });
};

export const getRequestedProductById = async (id: string) => {
  try {
    const requestedProduct = doc(db, 'requestedProducts', id);
    return getDoc(requestedProduct);
  } catch (error) {
    return error;
  }
};

export const updateRequestedProduct = async ({
  productInfo,
  collectionInfo,
}) => {
  try {
    const { id: productId } = productInfo;
    const { id: collectionId, user } = collectionInfo;
    const productToUpdate = doc(db, 'requestedProducts', productId);
    await updateDoc(productToUpdate, { ...productInfo });
    const updateProduct = doc(db, 'users', user, 'collections', collectionId);
    const gotDoc = await getDoc(updateProduct);
    const { productsRequested, ...other } = gotDoc.data();
    const updatedData = productsRequested.map((product) => {
      if (product.id === productId) {
        product = { ...product, ...productInfo };
      }
      return product;
    });
    updateDoc(updateProduct, { productsRequested: updatedData });
    const userData = await getUserDocData(user);
    const userEmail = userData.get('email');
    if (productInfo.status === 'Denied' || productInfo.status === 'Approved') {
      notifyOwner(
        { ...productInfo, collection: other.title },
        userEmail,
        productInfo.status
      );
    }
  } catch (error) {
    return error;
  }
};

export const collectionPublish = async (
  collectionId,
  userId,
  token,
  collectionData
) => {
  const data = await fetch(
    fineFindApis.createDesignProduct + '?type=collection',
    {
      method: 'POST',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        title: collectionData.get('title'),
        body_html: collectionData.get('description'),
        published: true,
      }),
    }
  );
  const response = await data.json();
  const updateProduct = doc(db, 'users', userId, 'collections', collectionId);
  await updateDoc(updateProduct, {
    published: true,
    shopifyUrl: response.admin_graphql_api_id,
    shopifyId: response.id,
  });
};
export const collectionUnPublish = async (
  collectionId,
  userId,
  token,
  collectionData
) => {
  const id = collectionData.get('shopifyId');
  const published = collectionData.get('published') as boolean;
  await fetch(
    fineFindApis.createDesignProduct + '?type=collectionupdate&id=' + id,
    {
      method: 'POST',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        published: !published,
      }),
    }
  );
  const updateProduct = doc(db, 'users', userId, 'collections', collectionId);
  await updateDoc(updateProduct, { published: !published });
};

import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth, db } from '../config/firebase';
import { AuthEmission } from '../types/AuthEmission';

const firebaseAuthProviderDefaultProps = {
  isInitialized: false,
  user: null,
  userIdToken: null,
  signUp: () => {
    return Promise.resolve();
  },
  signIn: () => {
    return Promise.resolve();
  },
  getUserAdditionalData: () => {
    return Promise.resolve();
  },
  firestoreSignOut: () => {
    return Promise.resolve();
  },
  sendFirestorePasswordResetEmail: () => {
    return Promise.resolve();
  },
} as AuthEmission;

const authContext = createContext<AuthEmission>(
  firebaseAuthProviderDefaultProps
);
const { Provider } = authContext;

export const useAuth = (): AuthEmission => {
  return useContext(authContext);
};

export // Provider hook that creates an auth object and handles its state
const useAuthProvider = (): AuthEmission => {
  const [user, setUser] = useState(null);
  const [userIdToken, setUserIdtoken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getUserIdToken = async (forceRefresh?: boolean) => {
    try {
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken(forceRefresh);
      }
      return '';
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const createUser = (createdUser) => {
    const userCollection = collection(db, 'users');
    const userDoc = doc(userCollection, createdUser.uid);

    return setDoc(userDoc, createdUser)
      .then(() => {
        getUserIdToken().then((token) => {
          setUser(createdUser);
          setUserIdtoken(token);
        });
        return createdUser;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signUp = ({ name, email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        sendEmailVerification(auth.currentUser);
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = (userToGet: User) => {
    const userCollection = collection(db, 'users');
    const userDoc = doc(userCollection, userToGet.uid);
    return getDoc(userDoc).then((userData) => {
      if (userData.data()) {
        setUser(userData.data());
      }
    });
  };

  const signIn = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const firestoreSignOut = () => {
    return signOut(auth).then(() => {
      setUser(false);
      setUserIdtoken(null);
    });
  };

  const sendFirestorePasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email).then((response) => {
      return response;
    });
  };

  const handleAuthStateChanged = (changedUser: User) => {
    getUserIdToken().then((token) => {
      setUserIdtoken(token);
      setUser(changedUser);
      setIsInitialized(true);
    });

    if (changedUser) {
      getUserAdditionalData(changedUser);
    }
  };
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user && user?.uid) {
      const userCollection = collection(db, 'users');
      const userDoc = doc(userCollection, user.uid);
      // Subscribe to user document on mount
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        getUserIdToken().then((token) => {
          setUser(docSnapshot.data());
          setUserIdtoken(token);
        });
      });
      return () => unsubscribe();
    }
  }, []);

  return {
    isInitialized,
    user,
    userIdToken,
    signUp,
    signIn,
    getUserAdditionalData,
    firestoreSignOut,
    sendFirestorePasswordResetEmail,
  };
};

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const providedAuth = useAuthProvider();
  return <Provider value={providedAuth}>{props.children}</Provider>;
}

import firebase from 'firebase';
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
  signOut: () => {
    return Promise.resolve();
  },
  sendPasswordResetEmail: () => {
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
    return db
      .collection('users')
      .doc(createdUser.uid)
      .set(createdUser)
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
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = (userToGet: firebase.User) => {
    return db
      .collection('users')
      .doc(userToGet.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser(userData.data());
        }
      });
  };

  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = () => {
    return auth.signOut().then(() => {
      setUser(false);
      setUserIdtoken(null);
    });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  const handleAuthStateChanged = (changedUser: firebase.User) => {
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
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => {
          getUserIdToken().then((token) => {
            setUser(doc.data());
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
    signOut,
    sendPasswordResetEmail,
  };
};

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const providedAuth = useAuthProvider();
  return <Provider value={providedAuth}>{props.children}</Provider>;
}

import firebase from 'firebase';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth, db } from '../config/firebase';

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export const useAuth: any = () => {
  return useContext(authContext);
};

// Provider hook that creates an auth object and handles its state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const createUser = (createdUser) => {
    return db
      .collection('users')
      .doc(createdUser.uid)
      .set(createdUser)
      .then(() => {
        setUser(createdUser);
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
        setUser(response.user);
        getUserAdditionalData(user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  const handleAuthStateChanged = (changedUser: firebase.User) => {
    setUser(changedUser);
    if (changedUser) {
      getUserAdditionalData(changedUser);
    }
  };
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  return {
    user,
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

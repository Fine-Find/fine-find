import { useRequireAuth } from '@/hooks/useRequireAuth';
import { UserType } from '@/types/profile.types';
import { getUserData } from '@/utils/firebaseFirestore';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useState } from 'react';

import { CreatingPage } from '../CreatingPage';

type PageCreationProps = {
  user: UserType;
  userIdToken: string;
};

export const PageCreation = ({ userIdToken }: PageCreationProps) => {
  const auth = useRequireAuth();
  const [newUser, setNewUser] = useState<UserType>(null);
  useEffect(() => {
    (async () => {
      if (auth?.user?.uid) {
        const data = await getUserData(auth?.user.uid);
        if (data) localStorage.setItem('user', JSON.stringify(data));
        setNewUser(data);
      }
    })();
  }, [auth]);
  const Loading = () => {
    return (
      <div id="skeleton">
        <Skeleton variant="text" />
      </div>
    );
  };

  return (
    <>
      {newUser ? (
        <CreatingPage user={newUser} userIdToken={userIdToken} />
      ) : (
        Loading()
      )}
    </>
  );
};

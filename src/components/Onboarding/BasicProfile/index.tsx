import { BasicProfileForm } from '@/components/Profile/BasicProfileForm';
import { UserType } from '@/types/profile.types';
import { Typography } from '@material-ui/core';

import styles from './BasicProfile.module.scss';

type Props = {
  user: UserType;
  updateBasicProfile: () => void;
};

export const BasicProfileOnboarding = ({ user, updateBasicProfile }: Props) => {
  return (
    <div className={styles.form}>
      <Typography>Step 2 of 4</Typography>
      <BasicProfileForm
        userId={user.uid}
        basicProfile={{
          firstName: user.application.firstName,
          lastName: user.application.lastName,
          email: user.email,
          state: '',
          country: 'USA',
        }}
        updateProfile={updateBasicProfile}
      />
    </div>
  );
};

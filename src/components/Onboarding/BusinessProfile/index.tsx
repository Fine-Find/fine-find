import { BusinessProfileForm } from '@/components/Profile/BusinessProfileForm';
import { UserType } from '@/types/profile.types';
import { Typography } from '@material-ui/core';

import styles from './BusinessProfile.module.scss';

type Props = {
  user: UserType;
  updateBusinessProfile: () => void;
  userIdToken?: any;
};

export const BusinessProfileOnboarding = ({
  user,
  updateBusinessProfile,
  userIdToken,
}: Props) => {
  return (
    <div className={styles.form}>
      <Typography>Step 4 of 4</Typography>
      <BusinessProfileForm
        userId={user.uid}
        businessProfile={{
          companyName: user.application.firm,
          description: '',
          website: user.application.website,
        }}
        updateProfile={updateBusinessProfile}
        userIdToken={userIdToken}
        basicProfile={user.basicProfile}
      />
    </div>
  );
};

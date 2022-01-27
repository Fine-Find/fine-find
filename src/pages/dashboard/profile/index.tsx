import DashboardLayout from '@/components/DashboardLayout';
import { BasicProfileForm } from '@/components/Profile/BasicProfileForm';
import { BusinessProfileForm } from '@/components/Profile/BusinessProfileForm';
import { ProfileImageCard } from '@/components/Profile/ProfileImageCard';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { BasicProfileType, BusinessProfileType } from '@/types/profile.types';
import { getProfileData } from '@/utils/firebaseFirestore';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react';

import styles from './profile.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [basicProfile, setBasicProfile] = useState<BasicProfileType>();
  const [businessProfile, setBusinessProfile] = useState<BusinessProfileType>();
  const [profileImage, setProfileImage] = useState();
  const [businessImage, setBusinessImage] = useState();

  useEffect(() => {
    (async () => {
      setLoadingProfile(true);
      if (auth?.user?.uid) {
        const profiles = await getProfileData(auth?.user.uid);
        profiles.basicProfile.email = auth.user.email;
        setBasicProfile(profiles.basicProfile);
        setBusinessProfile(profiles.businessProfile);
        setProfileImage(profiles.profileImage);
        setBusinessImage(profiles.businessImage);
        setLoadingProfile(false);
      }
    })();
  }, [auth]);

  if (!auth.isInitialized || !auth.user || loadingProfile)
    return <>{Loading()}</>;

  const updateBusinessProfile = (updatedProfile: BusinessProfileType) => {
    setBusinessProfile(updatedProfile);
  };

  const updateBasicProfile = (updatedProfile: BasicProfileType) => {
    setBasicProfile(updatedProfile);
  };

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ProfileImageCard
                title={`${basicProfile?.firstName} ${basicProfile?.lastName}`}
                subTitle=""
                buttonText="Change Profile Picture"
                isAvatar
                imgSrc={profileImage ?? '/img/undraw_female_avatar_w3jk.svg'}
                fileName="profile"
                userId={auth.user.uid}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <BasicProfileForm
                userId={auth.user.uid}
                basicProfile={basicProfile}
                updateProfile={updateBasicProfile}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ProfileImageCard
                title={businessProfile?.companyName}
                subTitle={businessProfile?.description}
                imgSrc={businessImage}
                buttonText="Change Company Logo"
                fileName="business"
                userId={auth.user.uid}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <BusinessProfileForm
                userId={auth.user.uid}
                businessProfile={businessProfile}
                updateProfile={updateBusinessProfile}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;

import { BasicProfileOnboarding } from '@/components/Onboarding/BasicProfile';
import { BusinessProfileOnboarding } from '@/components/Onboarding/BusinessProfile';
import { PageCreation } from '@/components/Onboarding/PageCreation';
import { ProfileImageOnboarding } from '@/components/Onboarding/ProfileImage';
import { Welcome } from '@/components/Onboarding/Welcome';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { UserOnboarding, UserType } from '@/types/profile.types';
import { getUserData, updateUserOnboarding } from '@/utils/firebaseFirestore';
import { fineFindPages } from '@/utils/urls';
import { Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from './onboarding.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const getStepFrom = (onboarding: UserOnboarding) => {
  if (!onboarding.welcome) {
    return 0;
  } else if (!onboarding.profileImage) {
    return 1;
  } else if (!onboarding.basicProfile) {
    return 2;
  } else if (!onboarding.businessImage) {
    return 3;
  } else if (!onboarding.businessProfile) {
    return 4;
  } else if (!onboarding.pageCreated) {
    return 5;
  } else {
    return 6;
  }
};

const OnboardingPage: React.FC = () => {
  const auth = useRequireAuth();
  const router = useRouter();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [user, setUser] = useState<UserType>();
  const [step, setStep] = useState<number>(-1);

  useEffect(() => {
    (async () => {
      setLoadingProfile(true);
      if (auth?.user?.uid) {
        const data = await getUserData(auth?.user.uid);
        setUser(data);
        setLoadingProfile(false);
        if (step === -1) {
          setStep(getStepFrom(data.onboarding));
        } else if (step === 6) {
          router.push(fineFindPages.dashboard);
        }
      }
    })();
  }, [auth, step]);

  const welcomeButtonClicked = () => {
    const updatedOnboarding = user.onboarding;
    updatedOnboarding.welcome = true;

    updateUserOnboarding(user.uid, updatedOnboarding).then(() => {
      setStep(getStepFrom(updatedOnboarding));
    });
  };

  const profileImageSet = () => {
    const updatedOnboarding = user.onboarding;
    updatedOnboarding.profileImage = true;

    updateUserOnboarding(user.uid, updatedOnboarding).then(() => {
      setStep(getStepFrom(updatedOnboarding));
    });
  };

  const businessImageSet = () => {
    const updatedOnboarding = user.onboarding;
    updatedOnboarding.businessImage = true;

    updateUserOnboarding(user.uid, updatedOnboarding).then(() => {
      setStep(getStepFrom(updatedOnboarding));
    });
  };

  const basicProfileSet = () => {
    const updatedOnboarding = user.onboarding;
    updatedOnboarding.basicProfile = true;

    updateUserOnboarding(user.uid, updatedOnboarding).then(() => {
      setStep(getStepFrom(updatedOnboarding));
    });
  };

  const businessProfileSet = () => {
    const updatedOnboarding = user.onboarding;
    updatedOnboarding.businessProfile = true;

    updateUserOnboarding(user.uid, updatedOnboarding).then(() => {
      setStep(getStepFrom(updatedOnboarding));
    });
  };

  if (!auth.isInitialized || !auth.user || loadingProfile)
    return <>{Loading()}</>;

  return (
    <div className={styles.root}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          className={`${styles.container} ${styles.headerContainer}`}
        >
          {step === 0 && <Welcome user={user} onClick={welcomeButtonClicked} />}
          {step === 1 && (
            <ProfileImageOnboarding
              imgSrc={user.profileImage ?? '/img/undraw_female_avatar_w3jk.svg'}
              user={user}
              nextStepText="Step 2: Profile"
              cardTitle={`${user.application.firstName} ${user.application.lastName}`}
              stepNumber={1}
              stepTitle="Profile Image"
              fileName="profile"
              errorText="A profile image is required"
              onClick={profileImageSet}
              buttonText="Upload a profile picture"
            />
          )}
          {step === 2 && (
            <BasicProfileOnboarding
              user={user}
              updateBasicProfile={basicProfileSet}
            />
          )}
          {step === 3 && (
            <ProfileImageOnboarding
              imgSrc={user.businessImage}
              user={user}
              nextStepText="Step 4: Company Profile"
              cardTitle={user.application.firm}
              stepNumber={3}
              stepTitle="Company Logo"
              fileName="business"
              errorText="A company logo is required"
              onClick={businessImageSet}
              buttonText="Upload a company logo"
            />
          )}
          {step === 4 && (
            <BusinessProfileOnboarding
              user={user}
              updateBusinessProfile={businessProfileSet}
            />
          )}
          {step === 5 && (
            <PageCreation user={user} userIdToken={auth.userIdToken} />
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default OnboardingPage;

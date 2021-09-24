import DashboardLayout from '@/components/DashboardLayout';
import { BasicProfileForm } from '@/components/Profile/BasicProfileForm';
import { BusinessProfileForm } from '@/components/Profile/BusinessProfileForm';
import { TitledImageCard } from '@/components/shared/TitledImageCard';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

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

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <TitledImageCard
                title="Jane Doe"
                subTitle="SomethingAbout the person"
                buttonText="Change Profile Picture"
                isAvatar
                imgSrc="/img/undraw_female_avatar_w3jk.svg"
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <BasicProfileForm />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <TitledImageCard
                title="The FineFind"
                subTitle=""
                buttonText="Change Company Logo"
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <BusinessProfileForm />
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;

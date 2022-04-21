import { verifyAdminDashboard } from '@/utils/roles';
import { Card, CardHeader, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/DashboardLayout';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import styles from './requests.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const AdminRequests: React.FC = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const [admin , setAdmin] = useState(false);

  useEffect(() => {
    verifyAdminDashboard(router, setAdmin);
  }, []);

  if (!auth.isInitialized || !auth.user)
    return <>{Loading()}</>;

  const dashboard = (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            <Grid container className={`${styles.moodRow}`} spacing={3}>
              
              <Grid item md={8} xs={12}>
                <Card elevation={0}>
                  <CardHeader title="admin requests" />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );

  return (
    <>
      {admin ? dashboard : Loading()}
    </>
  );
};
export default AdminRequests;

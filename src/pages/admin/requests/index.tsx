import { ProductsTable } from '@/components/shared/ProductsTable';
import products from '@/utils/getAllProducts';
import { verifyAdminDashboard } from '@/utils/roles';
import { Container } from '@material-ui/core';
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
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    products(setData);
    verifyAdminDashboard(router, setAdmin);
  }, []);

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  const dashboard = (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>Requested Products</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            {data && <ProductsTable row={data} />}
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );

  return <>{admin ? dashboard : Loading()}</>;
};
export default AdminRequests;

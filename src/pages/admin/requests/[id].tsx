import RequestProductPreview from '@/components/Products/RequestProductPreview';
import { RequestedProduct } from '@/types/RequestedProducts';
import { getRequestedProductById } from '@/utils/firebaseFirestore';
import { verifyAdminDashboard } from '@/utils/roles';
import { Container, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../../components/DashboardLayout';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import styles from '../../admin/admin.module.scss';

// getRequestedProductById
const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

const ProductPreview = () => {
  const auth = useRequireAuth();
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [product, setProduct] = useState<RequestedProduct>(null);
  const {
    query: { id },
  }: any = router;

  const getProduct = async () => {
    try {
      const result = await getRequestedProductById(id);
      const data = { ...result.data() } as RequestedProduct;
      setProduct(data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    verifyAdminDashboard(router, setAdmin);
  }, []);

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  const dashboard = (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>Requested Product preview</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            {product && <RequestProductPreview product={product} />}
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
  return <>{admin ? dashboard : Loading()}</>;
};

export default ProductPreview;

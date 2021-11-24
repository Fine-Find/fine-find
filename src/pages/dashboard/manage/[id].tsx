/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import DashboardLayout from '@/components/DashboardLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { RequestedProductDetails } from '@/types/RequestedProducts';
import { ShopifyProduct } from '@/types/shopify/Products';
import { getPostedCollectionById } from '@/utils/firebaseFirestore';
import { fineFindPages } from '@/utils/urls';
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Skeleton from '@material-ui/lab/Skeleton';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import styles from './manage.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Refactor how we are handling the query parameters coming back as arrays.
function queryParameterAsString(queryParameter: string | string[]): string {
  return Array.isArray(queryParameter) ? queryParameter[0] : queryParameter;
}

// TODO: Completely refactor this page to be simpler
const ManageCollectionPage: React.FC = () => {
  const router = useRouter();
  const auth = useRequireAuth();
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>(
    []
  );
  const [requestedProducts, setRequestedProducts] = useState<
    RequestedProductDetails[]
  >([]);
  const [collectionData, setCollectionData] =
    useState<DocumentSnapshot<DocumentData>>(null);

  const { id } = router.query;

  useEffect(() => {
    if (auth.isInitialized && auth.user) {
      getPostedCollectionById(queryParameterAsString(id), auth.user.uid).then(
        (collection) => {
          if (collection.exists()) {
            setCollectionData(collection);
            setSelectedProducts(collection.get('products'));
            setRequestedProducts(collection.get('productsRequested'));
          } else {
            router.push(fineFindPages.dashboard);
          }
        }
      );
    }
  }, [auth]);

  if (!auth.isInitialized || !auth.user || !collectionData) {
    return <>{Loading()}</>;
  }

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>{collectionData.get('title')}</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            <Grid item xs={12} md={8} xl={10} className={styles.imageGrid}>
              <img
                src={collectionData.get('src')}
                alt={collectionData.get('title')}
                className={styles.instagramImage}
              />
              {collectionData.get('description') && (
                <>
                  <Typography className={styles.description}>
                    Description
                  </Typography>
                  <Typography className={styles.descriptionDetails}>
                    {collectionData.get('description')}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={4} xl={2}>
              <Typography className={styles.taggedProducts}>
                Tagged Products
              </Typography>
              <Grid item>
                {(selectedProducts.length > 0 ||
                  requestedProducts.length > 0) && (
                  <>
                    <List className={styles.selectProductList}>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((product) => {
                          return (
                            <ListItem key={product.id}>
                              <ListItemAvatar>
                                <Image
                                  className={styles.image}
                                  src={product.originalSrc}
                                  alt={product.title}
                                />
                              </ListItemAvatar>
                              <ListItemText primary={product.title} />
                            </ListItem>
                          );
                        })}
                      {requestedProducts.length > 0 &&
                        requestedProducts.map((product) => {
                          return (
                            <ListItem key={product.productName}>
                              <ListItemAvatar>
                                <FiberNewIcon />
                              </ListItemAvatar>
                              <ListItemText
                                primary={product.productName}
                                secondary={product.vendorName}
                              />
                            </ListItem>
                          );
                        })}
                    </List>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default ManageCollectionPage;

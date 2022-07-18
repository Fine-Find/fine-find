/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CollectionPublishModel } from '@/components/Collection/CollectionPublishModel';
import DashboardLayout from '@/components/DashboardLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { RequestedProductDetails } from '@/types/RequestedProducts';
import { ShopifyProduct } from '@/types/shopify/Products';
import {
  collectionPublish,
  collectionUnPublish,
  getPostedCollectionById,
} from '@/utils/firebaseFirestore';
import { fineFindPages } from '@/utils/urls';
import {
  Badge,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Typography,
} from '@material-ui/core';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { DocumentData, DocumentSnapshot, collection } from 'firebase/firestore';
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
  const [collectionrequestedProducts, setCollectionRequestedProducts] =
    useState([]);
  const [collectionData, setCollectionData] =
    useState<DocumentSnapshot<DocumentData>>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [status, setStatus] = useState(true);
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (requestedProducts[0]) {
      const requestedProductsMap = requestedProducts.map((product) => {
        const ref = collectionrequestedProducts.find(
          (p) => p.id === product.id
        );
        if (ref) {
          return { ...product, ...ref };
        }
        return product;
      });
      setRequestedProducts(requestedProductsMap);
    }
  }, [collectionrequestedProducts]);
  useEffect(() => {
    if (auth.isInitialized && auth.user) {
      getPostedCollectionById(queryParameterAsString(id), auth.user.uid).then(
        ({ data, requestedProduct }) => {
          if (data.exists()) {
            setStatus(data.get('published'));
            setCollectionData(data);
            setSelectedProducts(data.get('products'));
            setRequestedProducts(data.get('productsRequested'));
            setCollectionRequestedProducts(requestedProduct);
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

  const publishCollection = async () => {
    const shopifyId = collectionData.get('shopifyId');
    if (shopifyId) {
      await collectionUnPublish(
        id,
        auth.user.uid,
        auth.userIdToken,
        collectionData
      );
    } else {
      await collectionPublish(
        id,
        auth.user.uid,
        auth.userIdToken,
        collectionData
      );
    }
    setShowAlert(true);
  };
  const unPublishCollection = () => {
    collectionUnPublish(id, auth.user.uid, auth.userIdToken, collectionData);
  };

  const showModal = (state) => {
    setOpen(true);
    setStatus(state);
  };
  const confirm = () => {
    setOpen(false);
    if (status) {
      publishCollection();
    } else {
      unPublishCollection();
    }
  };
  return (
    <DashboardLayout>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Collection was updated!</Alert>
      </Snackbar>
      <CollectionPublishModel
        open={open}
        status={status}
        handleClose={() => setOpen(false)}
        confirm={confirm}
      />
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

                  <div>
                    {collectionData?.get('published') && (
                      <Button
                        onClick={() => showModal(false)}
                        color="primary"
                        variant="outlined"
                      >
                        Un publish
                      </Button>
                    )}
                    {!collectionData?.get('published') && (
                      <Button
                        onClick={() => showModal(true)}
                        color="primary"
                        variant="contained"
                      >
                        Publish
                      </Button>
                    )}
                  </div>
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
                                <img
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
                              <Typography color="primary" variant="caption">
                                {product.status || ''}
                              </Typography>
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

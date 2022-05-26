/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { PublishingCriteriaModal } from '@/components/Collection/PublishingCriteriaModal';
import { UploadImageCard } from '@/components/Collections/UploadImageCard';
import DashboardLayout from '@/components/DashboardLayout';
import { RequestProductModal } from '@/components/Products/RequestProductModal';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { RequestedProductDetails } from '@/types/RequestedProducts';
import { ShopifyProduct } from '@/types/shopify/Products';
import { createCollectionValidation } from '@/utils/CreateCollectionFormValidation';
import {
  createPostedCollection,
  getNextPostedCollectionNumber,
  getPostedCollection,
} from '@/utils/firebaseFirestore';
import {
  getStorageDownloadUrl,
  uploadCollectionImage,
} from '@/utils/firebaseStorage';
import { fineFindApis, fineFindPages } from '@/utils/urls';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, LinearProgress, Snackbar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SearchIcon from '@material-ui/icons/Search';
import { Alert } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import throttle from 'lodash/throttle';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './create.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Completely refactor this page to be simpler
// TODO: How can we do nested forms with the modal so that it doesn't trigger the completion of the collection form?
// TODO: Update the UI to be cleaner once the nested form issue is resolved
const CreateCollectionPage: React.FC = () => {
  const auth = useRequireAuth();
  const [image, setImage] = useState(null);
  const [value, setValue] = React.useState<ShopifyProduct | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>(
    []
  );
  const [requestedProducts, setRequestedProducts] = useState<
    RequestedProductDetails[]
  >([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [productsError, setProductsError] = useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<ShopifyProduct[]>([]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [postData, setpostData] = useState({});
  const [openPublishingModal, setOpenPublishingModal] = useState(false);
  const [publishingCriteria, setPublishingCriteria] = useState('manual');
  const [isRequestedProductsOnly, setIsRequestedProductsOnly] = useState(false);

  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(createCollectionValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const fetchData = React.useMemo(
    () =>
      throttle((title: string) => {
        const queryParameters = new URLSearchParams({
          title,
        });
        const productsUrl = `${fineFindApis.searchProducts}?${queryParameters}`;
        fetch(productsUrl, {
          headers: {
            authorization: `bearer ${auth.userIdToken}`,
          },
        }).then((response) => {
          response.json().then((products) => {
            let newOptions = [] as ShopifyProduct[];
            if (value) {
              newOptions = [value];
            }

            if (products) {
              newOptions = [...newOptions, ...products];
            }

            setOptions(newOptions);
          });
        });
      }, 200),
    [inputValue, auth]
  );

  React.useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchData(inputValue);
  }, [value, inputValue, fetchData]);

  function addSelectedProduct(newProduct: ShopifyProduct) {
    if (newProduct === null || newProduct === undefined) {
      return;
    }

    const foundProduct = selectedProducts.find((product) => {
      return product.id === newProduct.id;
    });

    if (foundProduct === undefined) {
      setProductsError(false);
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  }

  function removeSelectedProduct(productId: string) {
    const updatedProductList = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProductList);

    if (
      updatedProductList &&
      updatedProductList.length === 0 &&
      requestedProducts &&
      requestedProducts.length === 0
    ) {
      setProductsError(true);
    }
  }

  function removeRequestedProduct(productToRemove: RequestedProductDetails) {
    const updatedProductList = requestedProducts.filter(
      (product) => product !== productToRemove
    );
    setRequestedProducts(updatedProductList);

    if (
      updatedProductList &&
      updatedProductList.length === 0 &&
      selectedProducts &&
      selectedProducts.length === 0
    ) {
      setProductsError(true);
    }
  }

  function onImageSet(file) {
    setImage(URL.createObjectURL(file));
  }

  function createShopifyPage() {
    // Call some API to create a page with the selectedProducts
    // We need to figure out how we want to lookup the saved page data the next time the page loads. We don't want to keep creating pages for the same image
    // Someone would want to update and add/remove the products.
    // We could look it up in Shopify if we stored the page id in firebase along with the image id from instagram. Then shopify would hold all of the product details for the page
  }

  // TODO: move this to server side code at some point
  async function fileUpload(
    data: any,
    products: any[],
    productsRequested: any[],
    publishOnCreation: boolean,
    criteria: string
  ) {
    setUploadingFile(true);

    const postedCollection = getPostedCollection(auth.user.uid);
    const postId = await getNextPostedCollectionNumber(postedCollection);

    const uploadTask = uploadCollectionImage(data.image, auth.user.uid, postId);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploadingFile(false);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // TODO: Error Handling
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getStorageDownloadUrl(uploadTask).then((imageUrl) => {
          const collectionData = {
            title: data.title,
            src: imageUrl,
            description: data.description || null,
            products,
            productsRequested,
            published: publishOnCreation,
            publishCondition: criteria,
            publishOnCreation: publishOnCreation,
          };

          createPostedCollection(collectionData, auth.user.uid)
            .then(async () => {
              setShowSuccess(true);
              if (collectionData.productsRequested.length > 0) {
                //send email to the admin
                const emailBody = {
                  requestedProducts: collectionData.productsRequested,
                  collectionTitle: collectionData.title,
                  user: {
                    email: auth.user.email,
                    name: auth.user.name,
                  },
                };
                try {
                  await fetch(fineFindApis.sendRequestedProductsEmail, {
                    method: 'POST',
                    body: JSON.stringify(emailBody),
                  });
                } catch (err) {
                  console.error('error', err);
                }
              }
              setTimeout(function () {
                router.push(fineFindPages.collections);
              }, 1500);
              return;
            })
            .catch((error) => {
              console.error(error);
              setUploadingFile(false);
            });
        });
      }
    );
  }

  const isRequestedProducts = () => {
    return selectedProducts.length < 1;
  };

  const onSubmit = (data) => {
    if (
      (selectedProducts && selectedProducts.length > 0) ||
      (requestedProducts && requestedProducts.length > 0)
    ) {
      setProductsError(false);
      setpostData(data);
      setIsRequestedProductsOnly(isRequestedProducts());
      setOpenPublishingModal(true);
    } else {
      setProductsError(true);
    }
  };

  const confirmPublishingCriteria = (criteria: string) => {
    setOpenPublishingModal(false);
    setPublishingCriteria(criteria);
    fileUpload(postData, selectedProducts, requestedProducts, false, criteria);
  };

  const onErrors = () => {
    if (selectedProducts && selectedProducts.length > 0) {
      setProductsError(false);
    } else {
      setProductsError(true);
    }
  };

  const addRequestedProduct = (newProduct: RequestedProductDetails) => {
    if (newProduct === null || newProduct === undefined) {
      return;
    }

    const foundProduct = requestedProducts.find((product) => {
      return (
        product.productName === newProduct.productName &&
        product.vendorName === newProduct.vendorName &&
        product.productType === newProduct.productType
      );
    });

    if (foundProduct === undefined) {
      setProductsError(false);
      setRequestedProducts([...requestedProducts, newProduct]);
    }

    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };
  const isPublishedOnCreation = async (choice: any) => {
    setOpenPublishingModal(false);
    const publishOnCreation = choice == 'false' ? false : true;
    fileUpload(
      postData,
      selectedProducts,
      requestedProducts,
      publishOnCreation,
      publishingCriteria
    );
  };

  if (!auth.isInitialized || !auth.user) {
    return <>{Loading()}</>;
  }

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <Snackbar
            open={showSuccess}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success">Collection was created!</Alert>
          </Snackbar>
          <h2>Create a new Collection</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.requestContainer}`}
          >
            <Grid item xs={12} md={6} lg={5} xl={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleOpen}
                className={styles.modalButton}
              >
                Request a new product
              </Button>
            </Grid>
            <RequestProductModal
              open={openModal}
              handleClose={handleClose}
              submitForm={addRequestedProduct}
            />
            <PublishingCriteriaModal
              confirm={confirmPublishingCriteria}
              handleClose={() => setOpenPublishingModal(false)}
              isRequestedProductsOnly={isRequestedProductsOnly}
              open={openPublishingModal}
              publishOnCreation={isPublishedOnCreation}
            />
          </Grid>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              <Grid
                container
                spacing={3}
                className={`${styles.container} ${styles.headerContainer}`}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={7}
                  xl={8}
                  className={styles.imageGrid}
                >
                  <TextField
                    className={styles.title}
                    name="title"
                    label="Collection Title"
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.title ? true : false}
                    helperText={errors.title?.message}
                    {...register('title')}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        ev.preventDefault();
                      }
                    }}
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Uploaded"
                      className={styles.instagramImage}
                    />
                  )}
                  {!image && (
                    <Grid
                      container
                      spacing={3}
                      className={styles.uploadContainer}
                    >
                      <Grid item xs={6}>
                        <UploadImageCard onClick={onImageSet} />
                      </Grid>
                    </Grid>
                  )}
                  <TextField
                    className={styles.description}
                    label="Description"
                    name="description"
                    type="text"
                    autoComplete="on"
                    fullWidth
                    multiline
                    variant="outlined"
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                    {...register('description')}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter') {
                        ev.preventDefault();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={5} xl={4}>
                  <Autocomplete
                    id="fine-find-products"
                    options={options}
                    getOptionLabel={(option) =>
                      typeof option === 'string' ? option : option.title
                    }
                    filterSelectedOptions
                    filterOptions={(x) => x}
                    value={value}
                    getOptionSelected={(optionToTest, valueToCompare) => {
                      return optionToTest.id === valueToCompare.id;
                    }}
                    onChange={(event: any, newValue: ShopifyProduct | null) => {
                      setOptions(newValue ? [newValue, ...options] : options);
                      setValue(newValue);
                      addSelectedProduct(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                      <Paper
                        className={`${styles.paperRoot} ${
                          productsError ? styles.searchBoxError : ''
                        }`}
                      >
                        <IconButton
                          //type="submit"
                          className={styles.iconButton}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                        <TextField
                          {...params}
                          className={styles.input}
                          label="Search"
                          fullWidth
                          onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                              ev.preventDefault();
                            }
                          }}
                        />
                      </Paper>
                    )}
                    renderOption={(option: any) => {
                      return (
                        <Grid container alignItems="center">
                          <Grid item>
                            {option.originalSrc && (
                              <img
                                className={styles.image}
                                src={option.originalSrc}
                                alt={option.title}
                              />
                            )}
                          </Grid>
                          <Grid item xs>
                            {option.title}
                            <Typography variant="body2" color="textSecondary">
                              {option.description.substr(
                                0,
                                option.description.indexOf('Product Details')
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    }}
                  />
                  {productsError && (
                    <Grid item>
                      <Typography className={styles.productError}>
                        Add a product
                      </Typography>
                    </Grid>
                  )}
                  <Grid item>
                    {(selectedProducts.length > 0 ||
                      requestedProducts.length > 0) && (
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
                                <ListItemText
                                  primary={product.title}
                                  //secondary={product.description}
                                />

                                <IconButton
                                  type="submit"
                                  className={styles.iconButton}
                                  aria-label="remove"
                                  onClick={() => {
                                    removeSelectedProduct(product.id);
                                  }}
                                >
                                  <CloseOutlined />
                                </IconButton>
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

                                <IconButton
                                  type="submit"
                                  className={styles.iconButton}
                                  aria-label="remove"
                                  onClick={() => {
                                    removeRequestedProduct(product);
                                  }}
                                >
                                  <CloseOutlined />
                                </IconButton>
                              </ListItem>
                            );
                          })}
                      </List>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {uploadingFile && (
                    <LinearProgress variant="determinate" value={progress} />
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    type="submit"
                    className={styles.button}
                    disabled={uploadingFile}
                  >
                    {!uploadingFile && 'SAVE'}
                    {uploadingFile && 'SAVING'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Container>
      </div>
    </DashboardLayout>
  );
};
export default CreateCollectionPage;

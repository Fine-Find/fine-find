/* eslint-disable @typescript-eslint/no-unused-vars */

import { UploadImageCard } from '@/components/Collections/UploadImageCard';
import DashboardLayout from '@/components/DashboardLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ShopifyProduct } from '@/types/shopify/Products';
import { fineFindApis } from '@/utils/urls';
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CloseOutlined } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import throttle from 'lodash/throttle';
import React, { useState } from 'react';

import styles from './create.module.scss';

const Loading = () => {
  return (
    <div id="skeleton">
      <Skeleton variant="text" />
    </div>
  );
};

// TODO: Completely refactor this page to be simpler
const CreateCollectionPage: React.FC = () => {
  const auth = useRequireAuth();
  const [image, setImage] = useState(null);
  const [value, setValue] = React.useState<ShopifyProduct | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>(
    []
  );
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<ShopifyProduct[]>([]);

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
    []
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
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  }

  function removeSelectedProduct(productId: string) {
    const updatedProductList = selectedProducts.filter(
      (product) => product.id !== productId
    );
    setSelectedProducts(updatedProductList);
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

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>Create a new Collection</h2>
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
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  className={styles.instagramImage}
                />
              )}
              {!image && (
                <Grid container spacing={3} className={styles.uploadContainer}>
                  <Grid item xs={6}>
                    <UploadImageCard onClick={onImageSet} />
                  </Grid>
                </Grid>
              )}
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
                  <Paper component="form" className={styles.paperRoot}>
                    <IconButton
                      type="submit"
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
              <Grid item>
                {selectedProducts.length > 0 && (
                  <>
                    <List className={styles.selectProductList}>
                      {selectedProducts.map((product) => {
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
                    </List>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => createShopifyPage()}
                      className={styles.button}
                    >
                      SAVE
                    </Button>
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
export default CreateCollectionPage;

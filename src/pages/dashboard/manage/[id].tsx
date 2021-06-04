/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShopifyProduct } from '@/types/shopify/Products';
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
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import DashboardLayout from '../../../components/DashboardLayout';
import InstagramLoginButton from '../../../components/Instagram/InstagramLoginButton';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import { manageMediaStyles } from '../../../styles/dashboard/manage/ManageMedia.styles';
import { fineFindApis, fineFindPages } from '../../../utils/urls';

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

function isInstagramStored(auth) {
  return (
    auth && auth.user && auth.user.instagram && auth.user.instagram.access_token
  );
}

function displayInstagramLogin(auth) {
  if (isInstagramStored(auth)) {
    return (
      <p>Connected to {auth.user.instagram.username}'s Instagram account</p>
    );
  }

  return <InstagramLoginButton />;
}

// TODO: Completely refactor this page to be simpler
const ManageImagePage: React.FC = () => {
  const router = useRouter();
  const styles = manageMediaStyles();
  const auth = useRequireAuth();
  const [value, setValue] = React.useState<ShopifyProduct | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ShopifyProduct[]>(
    []
  );
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<ShopifyProduct[]>([]);

  const {
    id,
    media_url,
    caption,
    timestamp,
    permalink,
    username,
  } = router.query;

  const fetchData = React.useMemo(
    () =>
      throttle((title: string) => {
        const queryParameters = new URLSearchParams({
          title,
        });
        const productsUrl = `${fineFindApis.searchProducts}?${queryParameters}`;

        fetch(productsUrl).then((response) => {
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

  const imageId = queryParameterAsString(id);
  const mediaUrl = queryParameterAsString(media_url);
  const mediaCaption = queryParameterAsString(caption);

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

  function createShopifyPage() {
    // Call some API to create a page with the selectedProducts
    // We need to figure out how we want to lookup the saved page data the next time the page loads. We don't want to keep creating pages for the same image
    // Someone would want to update and add/remove the products.
    // We could look it up in Shopify if we stored the page id in firebase along with the image id from instagram. Then shopify would hold all of the product details for the page
  }

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  if (!imageId || !mediaUrl) {
    router.push(fineFindPages.dashboard);
    return <>{Loading()}</>;
  }

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Grid
          container
          spacing={1}
          className={`${styles.container} ${styles.headerContainer}`}
        >
          <Grid item xs={12} md={8} xl={10} className={styles.imageGrid}>
            <img
              src={mediaUrl}
              alt={mediaCaption || imageId}
              className={styles.instagramImage}
            />
          </Grid>
          <Grid item xs={12} md={4} xl={2}>
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
                    label="Search Fine Find"
                    fullWidth
                  />
                </Paper>
              )}
              renderOption={(option) => {
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
                            secondary={product.description}
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
                  >
                    Create Shopify Page
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} className={styles.instagramInfo}>
            {displayInstagramLogin(auth)}
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};
export default ManageImagePage;

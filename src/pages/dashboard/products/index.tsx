/* eslint-disable @typescript-eslint/no-unused-vars */

import DashboardLayout from '@/components/DashboardLayout';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { ShopifyProduct } from '@/types/shopify/Products';
import { fineFindApis } from '@/utils/urls';
import { Container } from '@material-ui/core';
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
import Image from 'next/image';
import React, { useState } from 'react';

import styles from './products.module.scss';

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
const ProductsPage: React.FC = () => {
  const auth = useRequireAuth();
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

  if (!auth.isInitialized || !auth.user) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className={styles.root}>
        <Container maxWidth="xl">
          <h2>View Fine Find Products</h2>
          <Grid
            container
            spacing={3}
            className={`${styles.container} ${styles.headerContainer}`}
          >
            <Grid item xs={12}>
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
                renderOption={(option) => {
                  return (
                    <Grid container alignItems="center">
                      <Grid item>
                        {option.originalSrc && (
                          <Image
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
                              <Image
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
export default ProductsPage;

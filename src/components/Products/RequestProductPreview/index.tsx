import { updateRequestedProduct } from '@/utils/firebaseFirestore';
import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Select,
  TextField,
} from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './RequestProductPreview.module.scss';

interface props {
  product: any;
}
const RequestProductPreview: React.FC<props> = ({ product }) => {
  const [isDisbaled, setIsDisabled] = useState(false);

  const onSubmit = async (d) => {
    try {
      setIsDisabled(true);
      await updateRequestedProduct({
        productInfo: { ...d, productName: product.productName, id: product.id },
        collectionInfo: {
          id: product.collectionId,
          user: product.userId,
        },
      });
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState(product.status);

  const productsStatus = [
    {
      name: 'Pending',
      selectable: product.status == 'Pending' ? true : false,
      selected: product.status == 'Pending' ? true : false,
    },
    {
      name: 'Under Review',
      selectable: product.status == 'Pending' ? true : false,
      selected: product.status == 'Under Review' ? true : false,
    },
    {
      name: 'Approved',
      selectable: product.status == 'Under Review' ? true : false,
      selected: product.status == 'Approved' ? true : false,
    },
    {
      name: 'Denied',
      selectable: product.status == 'Under Review' ? true : false,
      selected: product.status == 'Denied' ? true : false,
    },
  ];

  const onStateChanged = (e: any) => {
    setState(e.target.value);
  };
  return (
    <>
      <Grid xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              value={product.productName}
              label="Product name"
              name={'productname'}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              value={product.productType}
              label="Product Type"
              name={'productType'}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              value={product.linkToProduct}
              label="Link to the product"
              name={'link'}
            />
          </Grid>

          <FormControl fullWidth style={{ marginTop: '20px' }}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="State"
              defaultValue={product.status}
              {...register('status')}
              name="status"
              input={<OutlinedInput label="State" color="primary" fullWidth />}
              onChange={onStateChanged}
            >
              {productsStatus.map((status) => (
                <MenuItem
                  key={status.name}
                  value={status.name}
                  selected={status.selected}
                  disabled={!status.selectable}
                >
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {state === 'Denied' && (
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField
                error={errors.reason ? true : false}
                color="primary"
                variant="outlined"
                fullWidth
                multiline={true}
                defaultValue={product?.reason}
                rows={3}
                {...register('reason', {
                  required: 'Please enter a reason',
                })}
                label={'Reason'}
                name="reason"
              />
              {errors.reason && (
                <FormHelperText id="password-text" error>
                  {errors.reason.message}
                </FormHelperText>
              )}
            </Grid>
          )}

          {state === 'Approved' && (
            <Grid item xs={12} style={{ marginTop: '20px' }}>
              <TextField
                error={errors.shopifyId ? true : false}
                color="primary"
                variant="outlined"
                defaultValue={product?.shopifyId}
                fullWidth
                {...register('shopifyId', {
                  required: 'Please enter shopify Id',
                })}
                label={'shopify Id'}
                name="shopifyId"
              />
              {errors.shopifyId && (
                <FormHelperText id="password-text" error>
                  {errors.shopifyId.message}
                </FormHelperText>
              )}
            </Grid>
          )}
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              select
              fullWidth
              color="primary"
              variant="outlined"
              name="productType"
              label="shopify product page type"
              defaultValue={product?.productType}
              {...register('productType')}
              SelectProps={{
                native: true,
              }}
            >
              <option value={'Drapery'}>Drapery</option>
              <option value={'Pillow'}>Pillow</option>
              <option value={'Furniture'}>Furniture</option>
            </TextField>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              label="Vendor relationship"
              name={'vendorRelationship'}
              multiline={true}
              rows={3}
              defaultValue={product?.vendorRelationship}
              {...register('vendorRelationship')}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              label="Pricing"
              name={'pricing'}
              defaultValue={product?.pricing}
              {...register('pricing')}
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              label="Image url"
              defaultValue={product?.imageUrl}
              name={'imageUrl'}
              {...register('imageUrl')}
            />
          </Grid>

          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              label="Description"
              name={'adminDescription'}
              {...register('adminDescription')}
              defaultValue={product?.adminDescription}
              multiline={true}
              rows={4}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              color="primary"
              variant="outlined"
              label="Lead time"
              name={'leadTime'}
              defaultValue={product?.leadTime}
              {...register('leadTime')}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            className={styles.button}
            variant="contained"
            color="primary"
            disabled={state === 'Pending' ? true : isDisbaled}
          >
            update request
          </Button>
        </form>
      </Grid>
    </>
  );
};

export default RequestProductPreview;

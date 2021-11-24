import { basicRequestValidation } from '@/utils/requestFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CardContent, Grid, MenuItem, TextField } from '@material-ui/core';
import { ProfileFormCard } from 'components/Profile/ProfileFormCard';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import styles from './request.module.scss';

export type ProductRequestProps = {
  submitForm: (data: any) => void;
};

export const RequestProductForm = ({ submitForm }: ProductRequestProps) => {
  // TODO: Pull this from Firebase
  const values = {
    productType: '',
    vendorName: '',
    productName: '',
    linkToProduct: '',
    vendorContactInfo: '',
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(basicRequestValidation),
  });
  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  const products = [
    'Fabric',
    'Trim',
    'Wallcovering',
    'Upholstered Furniture',
    'Casegoods',
    'Lighting',
    'Rugs',
    'Other',
  ];

  const selectProductType = watch('productType');

  return (
    <FormProvider {...methods}>
      <ProfileFormCard
        title="Request Product"
        subTitle=""
        buttonText="Submit"
        onSubmit={submitForm}
        className={styles.paper}
      >
        <CardContent>
          <Grid container spacing={6}>
            <Grid item md={12} xs={12}>
              <TextField
                select
                name={selectProductType}
                label="Product type"
                defaultValue={values.productType}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                fullWidth
                error={errors.productType ? true : false}
                helperText={errors.productType?.message}
                {...register('productType')}
              >
                {products.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                label="Vendor Name"
                name="vendorName"
                type="text"
                defaultValue={values.vendorName}
                autoComplete="on"
                aria-required
                fullWidth
                variant="outlined"
                error={errors.vendorName ? true : false}
                helperText={errors.vendorName?.message}
                {...register('vendorName')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="productName"
                label="Product Name"
                defaultValue={values.productName}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                fullWidth
                error={errors.productName ? true : false}
                helperText={errors.productName?.message}
                {...register('productName')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="linkToProduct"
                label="Link to Product"
                defaultValue={values.linkToProduct}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                fullWidth
                error={errors.linkToProduct ? true : false}
                helperText={errors.linkToProduct?.message}
                {...register('linkToProduct')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="vendorContactInfo"
                label="Vendor Contact Info"
                defaultValue={values.vendorContactInfo}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                fullWidth
                error={errors.vendorContactInfo ? true : false}
                helperText={errors.vendorContactInfo?.message}
                {...register('vendorContactInfo')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="description"
                label="Description/Comments"
                defaultValue={values.description}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={errors.description ? true : false}
                helperText={errors.description?.message}
                {...register('description')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </ProfileFormCard>
    </FormProvider>
  );
};

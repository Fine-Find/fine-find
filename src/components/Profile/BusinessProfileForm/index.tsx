import { buildProductBody } from '@/components/Onboarding/CreatingPage';
import { BasicProfileType, BusinessProfileType } from '@/types/profile.types';
import { updateBusinessProfile, updateShopifyUrl } from '@/utils/firebaseFirestore';
import { fineFindApis } from '@/utils/urls';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardContent,
  Grid,
  LinearProgress,
  TextField,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import slugify from 'slugify';

import { ProfileFormCard } from '../ProfileFormCard';
import { businessProfileValidation } from './BusinessProfileFormValidation';

// TODO: Remove the mask prior to storing the currency in the DB
export type BusinessProfileFormProps = {
  userId: string;
  businessProfile?: BusinessProfileType;
  updateProfile: (data: any) => void;
  userIdToken?: string;
  basicProfile?: BasicProfileType;
  videoProdId?: any;
};

export const BusinessProfileForm = ({
  userId,
  businessProfile,
  updateProfile,
  userIdToken,
  basicProfile,
  videoProdId,
}: BusinessProfileFormProps) => {
  const [updatingProfile, setUpdatingProfile] = useState(false);
  // TODO: Pull this from Firebase
  const values = businessProfile ?? {
    companyName: 'Lighthouse Designs',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    website: 'https://www.ld.co',
    hourlyRate: '200',
  };

  const methods = useForm({
    resolver: yupResolver(businessProfileValidation),
  });

  const {
    register,
    formState: { errors },
  } = methods;
  

  const onSubmit = (data: BusinessProfileType) => {
    setUpdatingProfile(true);
    updateBusinessProfile(userId, data)
      .then(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const newUser = { ...user, businessProfile: data };
        localStorage.setItem('user', newUser);
        updateProfile({...data});
        setUpdatingProfile(false);

        fetch(fineFindApis.deleteDesignProduct, {
          method: 'DELETE',
          headers: {
            authorization: `bearer ${userIdToken}`,
          },
          body: JSON.stringify({id: videoProdId}),
        })
          .then(() =>{
            
            console.error('prod deleted');
            const sluggedCompany = slugify(data.companyName, {
              remove: /\./g,
              trim: true,
              lower: true,
            });
            const productBody = buildProductBody({
              username: basicProfile.firstName,
              handle: sluggedCompany,
              price: data.hourlyRate,
            });
            fetch(fineFindApis.createDesignProduct, {
              method: 'POST',
              headers: {
                authorization: `bearer ${userIdToken}`,
              },
              body: JSON.stringify(productBody),
            })
              .then((shopifyRes) => {
                const url = `https://thefinefind.com/pages/${productBody.handle}`;
                const newRes = shopifyRes;
                newRes.json().then((res) => {
                  updateShopifyUrl(userId, url,res.id);
                  console.error('shopifyRes', res);
                });
              })
              .catch((error) => {
                console.error('errors', error);
              });
          })
          .catch(err =>{
            console.error('delete prodd error', err);
          });
      })
      .catch((error) => {
        console.error(error);
        setUpdatingProfile(false);
      });
  };

  return (
    <FormProvider {...methods}>
      {updatingProfile && <LinearProgress />}
      <ProfileFormCard
        title="Company"
        subTitle="All about your business"
        buttonText="Update Business Profile"
        onSubmit={onSubmit}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                name="companyName"
                label="Company Name"
                defaultValue={values.companyName}
                type="text"
                autoComplete="on"
                aria-required
                variant="outlined"
                fullWidth
                error={errors.companyName ? true : false}
                helperText={errors.companyName?.message}
                {...register('companyName')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Website"
                name="website"
                defaultValue={values.website}
                type="text"
                variant="outlined"
                fullWidth
                error={errors.website ? true : false}
                helperText={errors.website?.message}
                {...register('website')}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                label="Description"
                name="description"
                type="text"
                defaultValue={values.description}
                autoComplete="on"
                aria-required
                fullWidth
                multiline
                variant="outlined"
                error={errors.description ? true : false}
                helperText={
                  errors.description
                    ? errors.description?.message
                    : 'This description is displayed on your Shopify page'
                }
                {...register('description')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Hourly Rate"
                name="hourlyRate"
                defaultValue={values.hourlyRate}
                variant="outlined"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span>$</span>
                    </InputAdornment>
                  ),
                }}
                error={errors.hourlyRate ? true : false}
                helperText={
                  errors.hourlyRate
                    ? errors.hourlyRate.message
                    : 'When set allows customers to book time with your company at the provided rate'
                }
                {...register('hourlyRate')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </ProfileFormCard>
    </FormProvider>
  );
};

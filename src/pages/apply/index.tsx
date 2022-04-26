import { fineFindApis } from '@/utils/urls';
import { yupResolver } from '@hookform/resolvers/yup';
import { CardContent, Grid, InputLabel, TextField } from '@material-ui/core';
import Layout from 'components/Layout';
import { ProfileFormCard } from 'components/Profile/ProfileFormCard';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { basicApplyValidation } from '../../utils/applyFormValidation';
import styles from './apply.module.scss';

// TODO: Remove the mask prior to storing the phone number in the DB
const BasicApplyForm = () => {
  const router = useRouter();

  // TODO: Pull this from Firebase
  const values = {
    firstName: '',
    lastName: '',
    firm: '',
    location: '',
    website: '',
    instagramHandle: '',
    topVendors: '',
    letUsKnow: '',
    email: 'example@example.com',
    phone: '+15555555555',
  };

  const methods = useForm({
    resolver: yupResolver(basicApplyValidation),
  });
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = methods;

  const CHARACTER_LIMIT = 20;

  const currentLocation = watch('location');

  const errorMessage = errors.location?.message;
  const characterLimit = `${
    currentLocation ? currentLocation.length : 0
  } / ${CHARACTER_LIMIT}`;

  async function handleSubmit(data) {
    try {
      await fetch(fineFindApis.submitApplication, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      router.push('/thankyou');
    } catch (err) {
      // do something
    }
  }

  return (
    <Layout>
      <div className={styles.main}>
        <FormProvider {...methods}>
          <ProfileFormCard
            title="Apply Today"
            subTitle=""
            buttonText="Apply Now"
            className={styles.paper}
            onSubmit={handleSubmit}
          >
            <CardContent>
              <Grid container spacing={6}>
                <Grid item md={6} xs={12}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    defaultValue={values.firstName}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName?.message}
                    {...register('firstName')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Last name"
                    name="lastName"
                    type="text"
                    defaultValue={values.lastName}
                    autoComplete="on"
                    aria-required
                    fullWidth
                    variant="outlined"
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name="firm"
                    label="Firm"
                    defaultValue={values.firm}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.firm ? true : false}
                    helperText={errors.firm?.message}
                    {...register('firm')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name="location"
                    label="Location"
                    inputProps={{
                      maxLength: CHARACTER_LIMIT,
                    }}
                    defaultValue={values.location}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.location ? true : false}
                    helperText={errorMessage ? errorMessage : characterLimit}
                    {...register('location')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name="website"
                    label="Website"
                    defaultValue={values.website}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.website ? true : false}
                    helperText={errors.website?.message}
                    {...register('website')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    name="instagramHandle"
                    label="Instagram Handle"
                    defaultValue={values.instagramHandle}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.instagramHandle ? true : false}
                    helperText={errors.instagramHandle?.message}
                    {...register('instagramHandle')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    label="Email Address"
                    name="email"
                    defaultValue=""
                    type="email"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    {...register('email')}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <InputMask
                        mask="+1 (999) 999-9999"
                        value={value}
                        onChange={onChange}
                      >
                        {(inputProps) => (
                          <TextField
                            label="Phone"
                            variant="outlined"
                            type="tel"
                            fullWidth
                            error={errors.phone ? true : false}
                            helperText={errors.phone?.message}
                            {...inputProps}
                          />
                        )}
                      </InputMask>
                    )}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputLabel>Who are your top vendors?</InputLabel>
                  <TextField
                    name="topVendors"
                    placeholder="Fabric, Furniture, etc."
                    defaultValue={values.topVendors}
                    type="text"
                    autoComplete="on"
                    aria-required
                    variant="outlined"
                    fullWidth
                    error={errors.topVendors ? true : false}
                    helperText={errors.topVendors?.message}
                    {...register('topVendors')}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <InputLabel>
                    Would you like to let us know anything else for the
                    application?
                  </InputLabel>
                  <TextField
                    name="letUsKnow"
                    label=""
                    defaultValue={values.letUsKnow}
                    type="text"
                    autoComplete="on"
                    aria-required
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    error={errors.letUsKnow ? true : false}
                    helperText={errors.letUsKnow?.message}
                    {...register('letUsKnow')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </ProfileFormCard>
        </FormProvider>
      </div>
    </Layout>
  );
};
export default BasicApplyForm;

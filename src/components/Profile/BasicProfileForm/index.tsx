import { yupResolver } from '@hookform/resolvers/yup';
import { CardContent, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { usaStates } from '@/utils/usaStates';

import { ProfileFormCard } from '../ProfileFormCard';
import { basicProfileValidation } from './BasicProfileFormValidation';

// TODO: Remove the mask prior to storing the phone number in the DB
export const BasicProfileForm = () => {
  // TODO: Pull this from Firebase
  const values = {
    firstName: '',
    lastName: '',
    email: 'example@example.com',
    phone: '+15555555555',
    state: '',
    country: 'USA',
  };

  const methods = useForm({
    resolver: yupResolver(basicProfileValidation),
  });
  const {
    register,
    formState: { errors },
    control,
  } = methods;

  return (
    <FormProvider {...methods}>
      <ProfileFormCard
        title="Profile"
        subTitle="All about you"
        buttonText="Update Profile"
      >
        <CardContent>
          <Grid container spacing={3}>
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
                label="Email Address"
                name="email"
                defaultValue={values.email}
                type="email"
                autoComplete="on"
                aria-required
                aria-readonly
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="phone"
                control={control}
                defaultValue={values.phone}
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
            <Grid item md={6} xs={12}>
              <TextField
                label="Country"
                name="country"
                defaultValue={values.country}
                aria-required
                aria-readonly
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                error={errors.country ? true : false}
                helperText={errors.country?.message}
                {...register('country')}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Select State"
                name="state"
                defaultValue={values.state}
                aria-required
                variant="outlined"
                fullWidth
                select
                SelectProps={{ native: true }}
                error={errors.state ? true : false}
                helperText={errors.state?.message}
                {...register('state')}
              >
                {usaStates.map((option) => (
                  <option key={option.abbreviation} value={option.abbreviation}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileFormCard>
    </FormProvider>
  );
};

import { BasicProfileType } from '@/types/profile.types';
import { updateBasicProfile } from '@/utils/firebaseFirestore';
import { usaStates } from '@/utils/usaStates';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardContent,
  Grid,
  LinearProgress,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { ProfileFormCard } from '../ProfileFormCard';
import { basicProfileValidation } from './BasicProfileFormValidation';

export type BasicProfileFormProps = {
  userId: string;
  basicProfile?: BasicProfileType;
  updateProfile: (data: any) => void;
};

export const BasicProfileForm = ({
  userId,
  basicProfile,
  updateProfile,
}: BasicProfileFormProps) => {
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const values = basicProfile ?? {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@ld.co',
    phone: '+1 (555) 555-5555',
    state: '',
    country: 'USA',
    role: 'designer',
  };

  const onSubmit = (data: BasicProfileType) => {
    data.role = 'designer';
    localStorage.setItem('role', 'designer');
    setUpdatingProfile(true);
    updateBasicProfile(userId, data)
      .then(() => {
        updateProfile(data);
        setUpdatingProfile(false);
      })
      .catch((error) => {
        console.error(error);
        setUpdatingProfile(false);
      });
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
      {updatingProfile && <LinearProgress />}
      <ProfileFormCard
        title="Profile"
        subTitle="All about you"
        buttonText="Update Profile"
        onSubmit={onSubmit}
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

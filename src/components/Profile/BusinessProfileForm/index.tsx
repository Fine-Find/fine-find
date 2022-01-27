import { BusinessProfileType } from '@/types/profile.types';
import { updateBusinessProfile } from '@/utils/firebaseFirestore';
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

import { ProfileFormCard } from '../ProfileFormCard';
import { businessProfileValidation } from './BusinessProfileFormValidation';

// TODO: Remove the mask prior to storing the currency in the DB
export type BusinessProfileFormProps = {
  userId: string;
  businessProfile?: BusinessProfileType;
  updateProfile: (data: any) => void;
};

export const BusinessProfileForm = ({
  userId,
  businessProfile,
  updateProfile,
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
        updateProfile(data);
        setUpdatingProfile(false);
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
                helperText={errors.description?.message}
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

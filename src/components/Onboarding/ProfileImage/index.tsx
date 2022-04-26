import { ProfileImageCard } from '@/components/Profile/ProfileImageCard';
import { UserType } from '@/types/profile.types';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';

import styles from './ProfileImage.module.scss';

type ProfileImageProps = {
  user: UserType;
  buttonText: string;
  onClick: () => void;
  stepNumber: number;
  stepTitle: string;
  cardTitle: string;
  cardSubTitle?: string;
  imgSrc: string;
  fileName: 'business' | 'profile';
  nextStepText: string;
  errorText: string;
  moreText?: string;
};

// TODO: Listen for the profile image being set so that you can navigate to the next step
export const ProfileImageOnboarding = ({
  user,
  buttonText,
  onClick,
  stepNumber,
  stepTitle,
  cardTitle,
  cardSubTitle,
  fileName,
  nextStepText,
  errorText,
  imgSrc,
  moreText,
}: ProfileImageProps) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [errors, setErrors] = useState<string>();

  const nextStep = () => {
    if (imageUploaded) {
      onClick();
    } else {
      setErrors(errorText);
    }
  };

  const afterUpload = () => {
    setImageUploaded(true);
  };
  return (
    <div className={styles.container}>
      <Typography>Step {stepNumber} of 4</Typography>
      <Typography>{stepTitle}</Typography>
      <ProfileImageCard
        className={styles.imageCard}
        title={cardTitle}
        subTitle={cardSubTitle}
        buttonText={buttonText}
        isAvatar
        imgSrc={imgSrc}
        fileName={fileName}
        userId={user.uid}
        afterUpload={afterUpload}
      />
      <p>{moreText}</p>
      <Button variant="outlined" className={styles.button} onClick={nextStep}>
        {nextStepText}
      </Button>
      {errors && <Typography className={styles.error}>{errors}</Typography>}
    </div>
  );
};

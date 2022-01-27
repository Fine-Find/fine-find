import { UserType } from '@/types/profile.types';
import { Button, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Welcome.module.scss';

type WelcomeProps = {
  user: UserType;
  onClick: () => void;
};

export const Welcome = ({ user, onClick }: WelcomeProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.text}>
        {user.name}, welcome to
      </Typography>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src="/main_navy.png"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <Button variant="contained" color="secondary" onClick={onClick}>
        Start Onboarding
      </Button>
    </div>
  );
};

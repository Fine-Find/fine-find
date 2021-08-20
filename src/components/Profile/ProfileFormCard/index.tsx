import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode } from 'react';

import styles from './ProfileFormCard.module.scss';

type ProfileFormCardProps = {
  title: string;
  subTitle: string;
  children?: ReactNode;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
};

export const ProfileFormCard = ({
  title,
  subTitle,
  children,
  buttonText,
  onClick,
  className,
}: ProfileFormCardProps) => {
  return (
    <Card className={className}>
      <CardHeader title={title} subheader={subTitle} />
      <Divider variant="middle" />
      {children}
      <Divider variant="middle" />
      <div className={styles.buttonSection}>
        <Button color="primary" variant="contained" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './ProfileFormCard.module.scss';

type ProfileFormCardProps = {
  title: string;
  subTitle: string;
  children?: ReactNode;
  buttonText: string;
  onSubmit?: (data: any) => void;
  className?: string;
};

export const ProfileFormCard = ({
  title,
  subTitle,
  children,
  buttonText,
  onSubmit = (_data) => {
    return;
  },
  className,
}: ProfileFormCardProps) => {
  const methods = useFormContext();
  const { handleSubmit } = methods;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={className} elevation={0}>
        <CardHeader title={title} subheader={subTitle} />
        <Divider variant="middle" />
        {children}
        <Divider variant="middle" />
        <div className={styles.buttonSection}>
          <Button type="submit" color="primary" variant="contained">
            {buttonText}
          </Button>
        </div>
      </Card>
    </form>
  );
};

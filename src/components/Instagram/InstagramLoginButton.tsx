import Button from '@material-ui/core/Button';
import InstagramIcon from '@material-ui/icons/Instagram';
import { signIn } from 'next-auth/client';
import React from 'react';

import { useStyles } from './InstagramLoginButton.styles';

export default function InstagramLoginButton() {
  const styles = useStyles();

  return (
    <Button
      variant="contained"
      className={styles.button}
      onClick={() => signIn('instagram')}
      startIcon={<InstagramIcon />}
      size="large"
    >
      Connect your Instagram Account
    </Button>
  );
}

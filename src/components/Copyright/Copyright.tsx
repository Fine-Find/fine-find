import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import { useCopyrightStyles } from './Copyright.styles';

export default function Copyright(props) {
  const styles = useCopyrightStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      {...props}
      className={styles.copyright}
    >
      {'Copyright © '}
      <Link href="https://thefinefind.com/">
        <a>The Fine Find</a>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

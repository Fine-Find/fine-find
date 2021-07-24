import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import styles from './Copyright.module.scss';

export default function Copyright(props) {
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
        <a>The FineFind</a>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import styles from './Copyright.module.scss';

export default function Copyright(props) {
  return (
    <Typography variant="body2" {...props} className={styles.copyright}>
      {`© ${new Date().getFullYear()} `}
      <Link href="https://thefinefind.com/">
        <a>The FineFind</a>
      </Link>
      <br />
      {`All rights reserved.`}
    </Typography>
  );
}

import Layout from '@/components/Layout';
import React from 'react';

import styles from './thankyou.module.scss';

const BasicThankYouPage = () => {
  return (
    <Layout>
      <div className={styles.main}>
        <h1>Thank you for applying, we will be in touch soon!</h1>
      </div>
    </Layout>
  );
};
export default BasicThankYouPage;

import { Modal } from '@material-ui/core';
import React from 'react';

import { RequestProductForm } from '../RequestProductForm';
import styles from './RequestProductModal.module.scss';

export type RequestProductModalType = {
  open: boolean;
  handleClose: () => void;
  submitForm: (data) => void;
};

export const RequestProductModal = ({
  open,
  handleClose,
  submitForm,
}: RequestProductModalType) => {
  return (
    <Modal
      aria-labelledby="request-product"
      aria-describedby="request products to be added to a collection"
      className={styles.modal}
      open={open}
      onClose={handleClose}
    >
      <div>
        <RequestProductForm submitForm={submitForm} />
      </div>
    </Modal>
  );
};

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';
import React from 'react';

export const CollectionPublishModel = ({
  open,
  handleClose,
  confirm,
  status,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <DialogContentText>
          <span>
            Are you sure you want to {status == true ? 'Publish' : 'Unpublish'}{' '}
            this collection ?
          </span>
        </DialogContentText>

        <Grid container direction="row">
          <Button variant="contained" color="primary" onClick={confirm}>
            Yes
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

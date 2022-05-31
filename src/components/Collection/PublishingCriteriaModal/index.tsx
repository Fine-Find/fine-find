import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React from 'react';

import styles from './publishingcriteria.module.scss';

export const PublishingCriteriaModal = ({
  open,
  handleClose,
  confirm,
  publishOnCreation,
  isRequestedProductsOnly,
}) => {
  enum publishCondition {
    any = 'any',
    all = 'all',
    manual = 'manual',
  }
  const [selectedCriteria, setSelectedCriteria] = React.useState(
    publishCondition.manual
  );

  const [value, setValue] = React.useState('true');

  const confirmPublishingCriteria = () => {
    isRequestedProductsOnly
      ? confirm(selectedCriteria)
      : publishOnCreation(value);
  };
  const onChange = (event: any) => {
    setSelectedCriteria(event.target.value);
  };
  const criteria = [
    {
      value: publishCondition.any,
      label: 'Publish when any product is added',
    },
    {
      value: publishCondition.all,
      label: 'Publish when all products are added',
    },
    {
      value: publishCondition.manual,
      label: 'Designer will manually publish',
    },
  ];

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Publishing Criteria</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isRequestedProductsOnly && (
            <span>
              {' '}
              You are about to create a collection with only requested products.
              Please select the criteria for publishing.
            </span>
          )}

          {!isRequestedProductsOnly && (
            <span> Do you want to publish this collection now ?</span>
          )}
        </DialogContentText>
        {isRequestedProductsOnly && (
          <TextField
            select
            variant="outlined"
            defaultValue={criteria[2].value}
            className={styles.textField}
            fullWidth
            onChange={onChange}
          >
            {criteria.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}

        {!isRequestedProductsOnly && (
          <FormControl>
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel
                value={'true'}
                control={<Radio />}
                label="Yes! Publish now."
              />
              <FormControlLabel
                value={'false'}
                control={<Radio />}
                label="No! I'll Publish later."
              />
            </RadioGroup>
          </FormControl>
        )}

        <Grid container direction="row">
          <Button
            className={styles.button}
            variant="contained"
            onClick={confirmPublishingCriteria}
            color="primary"
          >
            Confirm
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

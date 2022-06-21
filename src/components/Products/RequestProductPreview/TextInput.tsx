import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const TextInput: React.FC<any> = ({ name, label, ...props }) => {
  return (
    <Grid item xs={12} style={{ marginTop: '20px' }}>
      <TextField
        label={label}
        name={name}
        type="text"
        fullWidth
        color="primary"
        variant="outlined"
        {...props}
      />
    </Grid>
  );
};

export default TextInput;

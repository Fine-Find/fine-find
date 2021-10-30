import { Grid } from '@material-ui/core';

import { UploadImageCard as Card } from './';

export default {
  title: 'Component/Upload Image Card',
  component: Card,
};

const Template = () => {
  const onClick = (image: any) => {
    // eslint-disable-next-line no-console
    console.log(image);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card onClick={onClick} />
      </Grid>
    </Grid>
  );
};

export const UploadImageCard = Template.bind({});

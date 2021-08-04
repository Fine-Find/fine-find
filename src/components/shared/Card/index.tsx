import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

import { Button } from '../OutlineButton';
import styles from './Card.module.scss';

export type CardProps = {
  image?: any;
  icon?: any;
  title?: string;
  paragraph?: string;
  direction?: 'left' | 'right';
};

export const Card = ({
  title,
  paragraph,
  image,
  icon,
  direction = 'left',
}: CardProps) => {
  const bg = image ? `url(${image})` : '#E8E8E8';
  const rotation =
    direction === 'left' ? styles.rotateLeft : styles.rotateRight;
  const textDirection =
    direction === 'left' ? styles.leftToRight : styles.rightToLeft;

  return (
    <Paper
      className={`${styles.root} ${rotation}`}
      style={{
        background: bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid container className={rotation}>
        <Grid item xs={12} sm container>
          <Grid container direction="column" spacing={2}>
            <Typography className={`${styles.title} ${textDirection}`}>
              {title}
            </Typography>
            <Grid container className={`${styles.grid} ${textDirection}`}>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={styles.icon}
                >
                  {icon}
                </Typography>
              </Grid>
              <Grid item xs={9} className={styles.text}>
                <Typography className={styles.paragraph}>
                  {paragraph}
                </Typography>
              </Grid>
            </Grid>
            {!image && (
              <Grid item className={styles.button}>
                <Button
                  label="Apply now"
                  textSize="16px"
                  marginRight={direction === 'left' ? true : false}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

// import React from 'react';
// import { Grid, Typography, Box, Paper, Button } from '@material-ui/core';
// import LanguageIcon from '@material-ui/icons/Language';
// // import styles from './Card.module.scss';
// // import LanguageIcon from '@material-ui/icons/Language';
// import { makeStyles } from '@material-ui/core'

// const useStyle = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(4),
//     margin: 'auto',
//     border: `3px solid plum`,
//     borderTopRightRadius: 50,
//     borderBottomRightRadius: 50,
//     maxWidth: '700px',
//     width: '100%',
//     paddingLeft: '90px',
//   },
//   grid: {
//     padding: theme.spacing(2),
//     paddingTop: '20px',
//     display: 'flex',
//     transform: 'none'
//   },
//   text: {
//     paddingRight: '50px',
//     width: '25%'
//   },
//   button: {
//     paddingLeft: '500px'
//   },
// }));

// export type CardProps = {

//   title: string;
//   paragraph: string;
//   orientation?: 'left' | 'right';
// }

// const leftside = {
//   transform: 'rotateY(360deg)',
//   direction: 'ltr'
// }
// const rightside = {
//   transform: 'rotateY(180deg)',
//   direction: 'rtl',
// }
// function changeOrientation (orientationOption: 'left' | 'right'): string {
//   if (orientationOption === 'left') {
//     return 'leftside';
//   }
//   return 'rightside';
// }

// export const Card= ({
//   title,
//   paragraph,
//   orientation = 'left',

// }:CardProps) => {

//   // const orientationMap =

//   const classes = useStyle();

//   return (
//     <Paper className={`${classes.root} ${changeOrientation(orientation)}`}
//           style={{
//             borderTopRightRadius: 50,
//             borderBottomRightRadius: 50,
//             // transform: orientationMap[orientation]
//           }}
//         >
//           <Grid container className={`${changeOrientation(orientation)}`}>
//             <Grid item xs={12} sm container>
//               <Grid item xs container direction="column" spacing={2}>
//                 <Typography className={classes.title}>
//                 {title}
//                 </Typography>
//                     <Grid container className={classes.grid}>
//                         <Grid item xs={1}>
//                           <Typography variant="body2" gutterBottom>
//                               <LanguageIcon />
//                           </Typography>
//                         </Grid>
//                         <Grid item xs={11} spacing={2} className={classes.text}>
//                           <Typography>
//                             {paragraph}
//                           </Typography>
//                         </Grid>
//                     </Grid>
//               </Grid>
//             </Grid>
//             <Grid item className={classes.button}>
//               <Button >
//                   Apply now
//               </Button>
//             </Grid>
//           </Grid>
//       </Paper>
//   );
// };

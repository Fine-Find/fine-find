import { Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';

import { Button } from '../OutlineButton';
import styles from './Card.module.scss';

export type CardProps = {
  src?: any;
  alt?: string;
  icon?: any;
  title?: string;
  paragraph?: string;
  direction?: 'left' | 'right';
};

export const Card = ({
  title,
  paragraph,
  src,
  icon,
  direction = 'left',
}: CardProps) => {
  const bg = src ? `url(${src})` : '#E8E8E8';

  const rotation =
    direction === 'left' ? styles.rotateLeft : styles.rotateRight;
  const textDirection =
    direction === 'left' ? styles.leftToRight : styles.rightToLeft;

  const iconDirection =
    direction === 'left' ? styles.iconLeft : styles.iconRight;

  const imageExist = src ? true : false;
    
  return (
    <Paper
      className={`${styles.root} ${rotation}`}
      style={{
        minHeight: imageExist ? '350px' : '100%',
        background: bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderLeft: 'none',
      }}
    >
      <Grid container className={rotation}>
        <Grid item xs={12} sm container>
          <Grid
            container
            direction="column"
            spacing={2}
            className={styles.container}
          >
            <Typography className={`${styles.title} ${textDirection}`}>
              <bdi>{title}</bdi>
            </Typography>
            <Grid container className={`${styles.grid} ${textDirection}`}>
              <Grid item xs={2} sm={2} md={2}>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={iconDirection}
                >
                  {icon}
                </Typography>
              </Grid>
              <Grid item xs={10} sm={10} md={10} className={styles.text}>
                <Typography className={styles.paragraph}>
                  <bdi>{paragraph}</bdi>
                </Typography>
              </Grid>
            </Grid>
            {!src && (
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

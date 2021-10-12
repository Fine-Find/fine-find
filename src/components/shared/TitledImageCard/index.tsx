import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode } from 'react';

import styles from './TitledImageCard.module.scss';

export type TitlePositionType = 'above' | 'below';

type TitledImageCardProps = {
  title: string;
  /**
   * Position of the title relative to the image
   */
  titlePosition?: TitlePositionType;
  subTitle: string;
  imgSrc?: string;
  buttonText?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  isAvatar?: boolean;
  alt?: string;
};

const renderButtonSection = (buttonText: string, onClick: () => void) => {
  if (buttonText === undefined || buttonText === null) {
    return null;
  }

  return (
    <>
      <Divider variant="middle" />
      <div className={styles.buttonSection}>
        <Button color="primary" variant="text" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </>
  );
};

const renderImage = (imgSrc: string, isAvatar: boolean, alt: string) => {
  const imageStyle = isAvatar ? styles.avatar : styles.image;
  return (
    <div className={styles.imageBox}>
      <CardMedia
        component="img"
        height={150}
        image={imgSrc}
        className={imageStyle}
        alt={alt}
      />
    </div>
  );
};

const renderTitledImage = (
  title: string,
  subTitle: string,
  titlePosition: TitlePositionType,
  imgSrc: string,
  isAvatar: boolean,
  alt: string
) => {
  return (
    <div className={styles.tileImageSection}>
      {titlePosition === 'below' && renderImage(imgSrc, isAvatar, alt)}
      <CardHeader
        className={styles.titleAndSubtitle}
        title={title}
        subheader={subTitle}
      />
      {titlePosition === 'above' && renderImage(imgSrc, isAvatar, alt)}
    </div>
  );
};

export const TitledImageCard = ({
  title,
  titlePosition = 'below',
  subTitle,
  children,
  imgSrc = '/img/undraw_Lighthouse_frb8.svg',
  buttonText,
  onClick,
  className,
  isAvatar = false,
  alt = 'placeholder',
}: TitledImageCardProps) => {
  return (
    <Card className={className} elevation={0}>
      {renderTitledImage(title, subTitle, titlePosition, imgSrc, isAvatar, alt)}
      {children}
      {renderButtonSection(buttonText, onClick)}
    </Card>
  );
};

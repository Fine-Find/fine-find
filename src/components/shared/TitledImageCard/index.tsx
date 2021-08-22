import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
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

const renderImage = (imgSrc: string) => {
  return (
    <Image
      className={styles.avatar}
      src={imgSrc}
      alt="User Profile Image"
      height={100}
      width={100}
    ></Image>
  );
};

const renderTitledImage = (
  title: string,
  subTitle: string,
  titlePosition: TitlePositionType,
  imgSrc: string
) => {
  return (
    <div className={styles.tileImageSection}>
      {titlePosition === 'below' && renderImage(imgSrc)}
      <CardHeader
        className={styles.titleAndSubtitle}
        title={title}
        subheader={subTitle}
      />
      {titlePosition === 'above' && renderImage(imgSrc)}
    </div>
  );
};

export const TitledImageCard = ({
  title,
  titlePosition = 'below',
  subTitle,
  children,
  imgSrc = '/img/undraw_female_avatar_w3jk.svg',
  buttonText,
  onClick,
  className,
}: TitledImageCardProps) => {
  return (
    <Card className={className}>
      {renderTitledImage(title, subTitle, titlePosition, imgSrc)}
      {children}
      {renderButtonSection(buttonText, onClick)}
    </Card>
  );
};

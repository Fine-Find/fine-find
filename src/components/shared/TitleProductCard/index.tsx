import { CardActionArea, CardMedia, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode } from 'react';

import styles from './TitleProductCard.module.scss';

export type TitlePositionType = 'above' | 'below';
type ProductsRequestedProps = {
  description: string;
  productName: string;
  linkToProduct: string;
  productType: string;
  vendorContactInfo: string;
  vendorName: string;
  status: string;
  shopifyId?: string;
};

type TitleProductCardProps = {
  /**
   * Position of the title relative to the image
   */
  titlePosition?: TitlePositionType;
  subTitle?: string;
  title: string;
  imgSrc?: string;
  buttonText?: string;
  children?: ReactNode;
  className?: string;
  isAvatar?: boolean;
  alt?: string;
  shopifyid?: string;
};
type ProductsCardProps = {
  imgSrc?: string;
  className?: string;
  alt?: string;
  productsRequested: ProductsRequestedProps[];
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
  titlePosition: TitlePositionType,
  imgSrc: string,
  isAvatar: boolean,
  alt: string
) => {
  return (
    <div className={styles.tileImageSection}>
      {titlePosition === 'below' && renderImage(imgSrc, isAvatar, alt)}
      <CardHeader className={styles.titleAndSubtitle} title={title} />
      {titlePosition === 'above' && renderImage(imgSrc, isAvatar, alt)}
    </div>
  );
};

// display each product card

export const TitleProductCard = ({
  titlePosition = 'below',
  children,
  imgSrc = '/img/undraw_Lighthouse_frb8.svg',
  buttonText,
  className,
  isAvatar = false,
  alt = 'placeholder',
  title,
  shopifyid,
}: TitleProductCardProps) => {
  return (
    <Card className={className} elevation={0}>
      <CardActionArea href={'' + shopifyid}>
        {renderTitledImage(title, titlePosition, imgSrc, isAvatar, alt)}
        {children}
        {renderButtonSection(buttonText, null)}
      </CardActionArea>
    </Card>
  );
};

// receive productsRequested[]

export const ProductsCard = ({
  imgSrc,
  className,
  productsRequested,
}: ProductsCardProps) => {
  return (
    <>
      {productsRequested.length &&
        productsRequested.map((product) => {
          return (
            <>
              <Grid item xs={12} md={3} lg={3} key={product.productName}>
                <TitleProductCard
                  title={product.productName}
                  imgSrc={imgSrc}
                  buttonText={product.status}
                  className={className}
                  shopifyid={
                    product.status == 'Approved'
                      ? 'https://thefinefind.com/Product/' + product.shopifyId
                      : '#'
                  }
                />
              </Grid>
            </>
          );
        })}
    </>
  );
};

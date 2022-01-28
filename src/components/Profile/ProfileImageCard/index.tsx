import { updateUserImage } from '@/utils/firebaseFirestore';
import {
  getStorageDownloadUrl,
  uploadUserImage,
} from '@/utils/firebaseStorage';
import { CardMedia, LinearProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './ProfileImageCard.module.scss';

export type TitlePositionType = 'above' | 'below';

// TODO: Consolidate this with the TitledImageCard as the only difference is in the button rendering
type ProfileImageCardProps = {
  title: string;
  /**
   * Position of the title relative to the image
   */
  titlePosition?: TitlePositionType;
  subTitle: string;
  imgSrc?: string;
  buttonText?: string;
  afterUpload?: () => void;
  children?: ReactNode;
  className?: string;
  isAvatar?: boolean;
  alt?: string;
  userId: string;
  fileName: 'profile' | 'business';
};

const renderButtonSection = (
  buttonText: string,
  onClick: () => void,
  inputFile,
  changeHandler: (event: any) => void
) => {
  if (buttonText === undefined || buttonText === null) {
    return null;
  }

  return (
    <>
      <Divider variant="middle" />
      <div className={styles.buttonSection}>
        <input
          aria-label="image"
          ref={inputFile}
          accept="image/*"
          className={styles.input}
          aria-required
          id="icon-button-file"
          type="file"
          onChange={changeHandler}
        />
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

export const ProfileImageCard = ({
  title,
  titlePosition = 'below',
  subTitle,
  children,
  imgSrc = '/img/undraw_Lighthouse_frb8.svg',
  buttonText,
  afterUpload = () => {
    return;
  },
  className,
  isAvatar = false,
  alt = 'placeholder',
  userId,
  fileName,
}: ProfileImageCardProps) => {
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [defaultUserImage, setDefaultUserImage] = useState(imgSrc);
  const [progress, setProgress] = useState(0);
  const inputFile = useRef(null);

  // TODO: move this to server side code at some point
  async function fileUpload(image: any) {
    setUploadingFile(true);

    const uploadTask = uploadUserImage(image, userId, fileName);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setUploadingFile(false);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        // TODO: Error Handling
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getStorageDownloadUrl(uploadTask).then((imageUrl) => {
          updateUserImage(userId, imageUrl, fileName)
            .then(() => {
              setUploadingFile(false);
              afterUpload();
            })
            .catch((error) => {
              console.error(error);
              setUploadingFile(false);
            });
        });
      }
    );
  }

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    fileUpload(file);
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setDefaultUserImage(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  return (
    <Card className={className} elevation={0}>
      {uploadingFile && (
        <LinearProgress variant="determinate" value={progress} />
      )}
      {renderTitledImage(
        title,
        subTitle,
        titlePosition,
        defaultUserImage,
        isAvatar,
        alt
      )}
      {children}
      {renderButtonSection(buttonText, onButtonClick, inputFile, changeHandler)}
    </Card>
  );
};

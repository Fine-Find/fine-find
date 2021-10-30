import { Card, IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { useRef, useState } from 'react';

import styles from './UploadImageCard.module.scss';

export type UploadImageCardProps = {
  onClick?: (file: any) => void;
};

// TODO: Refactor this at some point to support selecting from instagram instead
export const UploadImageCard = ({ onClick }: UploadImageCardProps) => {
  const [highlight, setHighlight] = useState(false);

  const changeHandler = (event) => {
    onClick(event.target.files[0]);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onDragOver = (event) => {
    event.preventDefault();

    setHighlight(true);
  };

  const onDragLeave = (event) => {
    const isInnerElement =
      event.target.contains(event.relatedTarget) ||
      event.currentTarget.contains(event.relatedTarget);
    if (!isInnerElement) {
      setHighlight(false);
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const isImage = file.type.includes('image/');

    setHighlight(false);

    if (isImage) {
      onClick(event.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Card
          className={`${styles.card} ${highlight ? styles.highlight : ''}`}
          onClick={openFileDialog}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            ref={fileInputRef}
            accept="image/*"
            className={styles.input}
            id="icon-button-file"
            type="file"
            onChange={changeHandler}
          />
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <AddCircleIcon className={styles.icon} />
          </IconButton>
        </Card>
        <Typography className={styles.text}>Upload Image</Typography>
      </div>
    </>
  );
};

import { Card, IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from './UploadImageCard.module.scss';

export type UploadImageCardProps = {
  onClick?: (file: any) => void;
};

// TODO: Refactor this at some point to support selecting from instagram instead
export const UploadImageCard = ({ onClick }: UploadImageCardProps) => {
  const [highlight, setHighlight] = useState(false);
  const methods = useFormContext();

  const changeHandler = (event) => {
    methods.setValue('image', event.target.files[0]);
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
      methods.setValue('image', event.dataTransfer.files[0]);
      onClick(event.dataTransfer.files[0]);
    }
  };

  const errors = methods.formState.errors;

  return (
    <>
      <div className={styles.container}>
        <Controller
          name="image"
          control={methods.control}
          render={({ field }) => {
            return (
              <Card
                ref={field.ref}
                onChange={changeHandler}
                className={`${styles.card} ${highlight ? styles.highlight : ''}
                ${errors.image ? styles.cardError : ''}`}
                onClick={openFileDialog}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <input
                  aria-label="image"
                  ref={fileInputRef}
                  accept="image/*"
                  className={styles.input}
                  aria-required
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
                {errors.image && (
                  <Typography className={`${styles.text} ${styles.textError}`}>
                    {errors.image.message}
                  </Typography>
                )}
              </Card>
            );
          }}
        />
        <Typography className={styles.text}>Upload Image</Typography>
      </div>
    </>
  );
};

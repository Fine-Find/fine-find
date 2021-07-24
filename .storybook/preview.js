import '../src/styles/styles.scss';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import * as nextImage from 'next/image';
import React from 'react';

import { theme } from '../src/styles/theme'; // whereever you have defined your material ui theme

export const decorators = [
  (Story) => (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
];

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
    },
  },
};

// Replace next/image for Storybook
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height } = props;
    const ratio = (height / width) * 100;
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative',
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          {...props}
        />
      </div>
    );
  },
});

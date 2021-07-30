import { createTheme } from '@material-ui/core/styles';
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    instagram: {
      backgroundColor: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    instagram: {
      backgroundColor: React.CSSProperties['color'];
    };
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    instagram?: Palette['primary'];
    platinum?: Palette['primary'];
    tertiary?: Palette['primary']; 
  }
  interface PaletteOptions {
    instagram?: PaletteOptions['primary'];
    tertiary?: PaletteOptions['primary'];
    platinum?: PaletteOptions['primary']; 
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#222847',
      light: '#4e536b',
      dark: '#171c31',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#CABEB8',
      light: '#d4cbc6',
      dark: '#8d8580',
      contrastText: '#000',
    },
    tertiary: {
      main: '#737D92',
      light: '#8f97a7',
      dark: '#505766',
      contrastText: '#ffffff',
    },
    instagram: {
      main: '#e33e5c',
      light: '#e6516c',
      dark: '#c83751',
      contrastText: '#ffffff',
    },
    platinum: {
      main: '#E8E8E8',
      light: '#ececec',
      dark: '#a2a2a2',
      contrastText: '#000',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 10,
  },
  instagram: {
    backgroundColor: '#e33e5c',
  },
});

export default theme;

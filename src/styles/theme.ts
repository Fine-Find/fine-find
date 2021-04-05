import { createMuiTheme } from '@material-ui/core/styles';
declare module '@material-ui/core/styles/createMuiTheme' {
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
  }
  interface PaletteOptions {
    instagram?: PaletteOptions['primary'];
    platinum?: PaletteOptions['primary'];
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#737D93',
      light: '#8f97a8',
      dark: '#505766',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#AB978D',
      light: '#bbaba3',
      dark: '#776962',
      contrastText: '#ffffff',
    },
    instagram: {
      main: '#e33e5c',
      light: '#e6516c',
      dark: '#c83751',
      contrastText: '#ffffff',
    },
    platinum: {
      main: '#e9e9e9',
      light: '#ededed',
      dark: '#a3a3a3',
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

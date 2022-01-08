import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ba3608',
      light: '#f36737',
      dark: '#830000',
    },
    secondary: {
      main: '#fff59d',
      light: '#ffffcf',
      dark: '#cbc26d',
    },
    error: {
      main: '#FB1700',
      dark: '#A30F00',
    },

    info: {
      main: '#95C4CC',
      dark: '#6D8B90',
    },
    success: {
      main: '#6CDDA7',
      dark: '#4C9F77',
    },
    background: {
      paper: '#FFF',
      default: '#FFF',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: 24,
      color: '#3C3833',
    },
    h2: {
      fontWeight: 700,
      fontSize: 18,
      color: '#3C3833',
    },
    h3: {
      fontWeight: 700,
      fontSize: 16,
      color: '#3C3833',
    },
    h4: {
      fontWeight: 500,
      fontSize: 16,
      color: '#3C3833',
    },
    h5: {
      fontWeight: 500,
      fontSize: 14,
      color: '#3C3833',
    },
    body1: {
      fontWeight: 500,
      fontSize: 12,
      color: '#3C3833',
    },
    link: {
      fontWeight: 500,
      fontSize: 16,
      color: '#3C3833',
    },
    button: {
      fontWeight: 500,
      fontSize: 16,
      color: '#3C3833',
    },
  },
});

export default theme;

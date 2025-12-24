import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#333',
    },
  },
});

export default theme;
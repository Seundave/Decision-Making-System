import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h5: {
      fontWeight: '600',
    },
    h4: {
      fontWeight: '700',
    },
  },
});

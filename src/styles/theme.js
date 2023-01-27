import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';
import MuiButton from './MuiComponents/MuiButton';
import MuiPaper from './MuiComponents/MuiPaper';
import MuiCssBaseline from './MuiComponents/MuiCssBaseline';

// theme object structure:
// https://mui.com/material-ui/customization/default-theme/

const palette = {
  primary: {
    light: orange[100],
    main: orange[900],
    dark: orange[700],
    contrastText: '#fff',
  },
  secondary: orange,
};

const theme = createTheme({
  palette,
  components: {
    MuiCssBaseline,
    MuiButton,
    MuiPaper,
  },
});

export default theme;

import { createTheme } from '@mui/material';
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';
import MuiCssBaseline from './MuiComponents/MuiCssBaseline';
import MuiButton from './MuiComponents/MuiButton';
import MuiPaper from './MuiComponents/MuiPaper';
import MuiDialog from './MuiComponents/MuiDialog';
import MuiPopover from './MuiComponents/MuiPopover';

// theme object structure:
// https://mui.com/material-ui/customization/default-theme/

export const colorsList = [
  common,
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
];

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
    MuiDialog,
    MuiPopover,
  },
});

export default theme;

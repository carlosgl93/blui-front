import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { esES } from '@mui/x-date-pickers/locales';

import { Themes } from './types';

const sharedTheme = {
  spacing: 4,
  typography: {
    allVariants: {
      fontFamily: 'Manrope, sans-serif',
    },
  },
  palette: {
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  esES,
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#fafafa',
          },
          '&:hover': {
            color: '#970B80',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '33px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
    // MuiDigitalClock: {
    //   styleOverrides: {
    //     root: (rootStyleProps) => {
    //       console.log('rootStyleProps', rootStyleProps);
    //       return {
    //         // backgroundColor: selected ? '#970B80' : 'transparent',
    //         // color: selected ? '#fff' : '#000',
    //         borderRadius: '50%',
    //         padding: '0.5rem',
    //       };
    //     },

    //     item: (itemStyleProps) => {
    //       console.log('itemStyleProps', itemStyleProps)
    //       return {
    //         backgroundColor: itemStyleProps. ? '#970B80' : 'transparent',
    //         // color: selected ? '#fff' : '#000',
    //         borderRadius: '50%',
    //         padding: '0.5rem',
    //       };
    //     },
    //   },
    // },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#f2f2f2',
        paper: '#fff',
        grey: '#f9f7f6',
      },
      primary: {
        main: '#970B80',
        dark: '#502048',
        light: '#fff7fe',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fff7fe',
        dark: '#414042',
        contrastText: '#E6AF2E',
      },
      error: {
        main: '#d72a31',
      },
    },
  }),
};

export default themes;

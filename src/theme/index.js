import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    purple3: {
      main: "#000",
      light: '#000',
      dark: '#000',
      contrastText: '#000'
    },
    primary: {
      main: "#054477",
    },
    primary2: {
      main: '#DBBB6F',
      light: '#DBBB6F',
      dark: '#8F5F25',
      contrastText: '#FFF',
    },
    secondary: {
      main: "#5D5FEF",
    },
    success: {
      main: "#43CC6C",
    },
    text: {
      primary: "#636A85",
      secondary: "#000000",
      disabled: "#C0C0C0",
    },
    background: {
      default: "#F5F5F5",
    },
    custom: {
      required: "#EC6523",
      thirdary: "#C478EE",
      background: { blue: "#082A49", gray: "#F5F5F5", white: "#ffffff" },
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: 16,
    h2: {
      color: "#000000",
      fontWeight: 700,
      fontSize: 32,
    },
    small: {
      fontSize: 12,
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          borderRadius: 8,
          textTransform: "initial",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        style: {
          backgroundColor: "#F9FAFB",
          borderColor: "#D1D5DB",
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        style: {
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        style: {
          color: "primary.main",
          textDecoration: "none",
          borderRadius: 10,
          transition: "background-color 0.2s ease-out",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          '&[role="menu"]': {
            backgroundColor: "#ffffff",
            borderRadius: 12,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
  breakpoints: {
    values: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1530,
      xxxl: 1710,
    },
  },
  sizes: {
    header: 15,
    sidebar: 30,
  },
});

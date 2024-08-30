import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";
import { appTypography, plusFont } from "./app.typography";

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    note: {
      main: "rgba(254, 237, 175)",
    },
    primary: {
      main: "#2D52BD",
      light: "#ECF2FF",
      dark: "#4570EA",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
    },
    success: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },

    grey: {
      100: "#F2F6FA",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2A3547",
    },

    text: {
      primary: "#2A3547",
      secondary: "#FFFFFF",
      bold: "#2c2929",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
    gold: {
      main: "#FFD35C",
    },
    bg: {
      main: "#F5F5F5",
      dark: "#F5F5F5",
      light: "#F0F0F0",
    },
    border: {
      main: "#E0E0E0",
    },
  },

  typography: appTypography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*::-webkit-scrollbar": {
          width: "8px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#C4C4C4",
          borderRadius: "8px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#A0A0A0",
        },
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
          fontFamily: plusFont.style.fontFamily,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#2A3547",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f5f5f5",
        },
      },
    },
  },
});

export { baselightTheme };

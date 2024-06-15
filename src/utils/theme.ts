import { type ThemeOptions, createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#54487A",
    },
    secondary: {
      main: "#FAFAFA",
    },
    error: {
      main: "#D9534F",
    },
    success: {
      main: "#73D216",
    },
  },
  shape: {
    borderRadius: 4,
  },
};

export const hanalyticsTheme = createTheme(themeOptions)

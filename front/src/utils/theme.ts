import "@fontsource/montserrat";
import "@fontsource/lora";
import { ThemeOptions } from "@mui/material/styles/createTheme";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#009688",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#fb8c00",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#43a047",
    },
  },
  shape: {
    borderRadius: "10px 10px 0px 10px",
  },
  typography: {
    fontFamily: "Montserrat",
    h1: {
      fontFamily: "Lora",
    },
    h2: {
      fontFamily: "Lora",
    },
    h3: {
      fontFamily: "Lora",
    },
    h4: {
      fontFamily: "Lora",
    },
    h5: {
      fontFamily: "Lora",
    },
    h6: {
      fontFamily: "Lora",
    },
    button: {
      fontWeight: 600,
    },
  },
};

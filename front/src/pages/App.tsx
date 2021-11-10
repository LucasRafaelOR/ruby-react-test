import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeOptions } from "../utils/theme";
import "../css/main.css";
import HomePage from "./HomePage";
import NewFormPage from "./NewFormPage";
import FormPage from "./FormPage";
import ResponsePage from "./ResponsePage";
import NewResponsePage from "./NewResponsePage";

const theme = createTheme(themeOptions);

console.log(theme);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/new" element={<NewFormPage />}></Route>
          <Route path="/form/:id" element={<FormPage />}></Route>
          <Route
            path="/form/:form_id/responses/:id"
            element={<ResponsePage />}
          ></Route>
          <Route
            path="/form/:form_id/new/"
            element={<NewResponsePage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

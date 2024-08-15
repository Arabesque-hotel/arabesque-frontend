import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LanguageContext from "./context/Language/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LanguageContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageContext>
  </React.StrictMode>
);

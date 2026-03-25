/**
 * @file main.jsx
 * @description React application entry point.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root not found in the document.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

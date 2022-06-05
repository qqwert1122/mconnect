import "index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "components/App";
import ScrollToTop from "ScrollToTop";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

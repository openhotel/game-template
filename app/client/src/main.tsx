import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApplicationComponent } from "modules/application";

const domNode = document.getElementById("root");

const root = createRoot(domNode);

root.render(
  <StrictMode>
    <ApplicationComponent />
  </StrictMode>,
);

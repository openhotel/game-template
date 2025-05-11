import React from "react";
import ReactDOM from "react-dom/client";
import Preview from "./preview";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<Preview />);
}

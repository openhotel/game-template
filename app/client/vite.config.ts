import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  clearScreen: false,
  server: {
    port: 2000,
  },
  plugins: [react()],
  root: "./src",
  base: "/",
  build: {
    outDir: "../../../build/client",
    lib: {
      entry: "./game.tsx",
      fileName: "bundle.js",
      formats: ["es"],
    },
    minify: true,
    emptyOutDir: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@openhotel/pixi-components",
        "@oh/utils",
      ],
      output: {
        format: "module",
        manualChunks: () => "everything",
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  // root: "./src/client",
  // base: "/",
  // publicDir: "./assets/",
  build: {
    lib: {
      entry: "./src/client/game.tsx",
      fileName: (format) => `bundle.js`,
      formats: ["es"],
    },
    outDir: "./build",
    minify: true,
    emptyOutDir: true,
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
        // globals: {
        //   react: "reactu",
        // },
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern",
  //     },
  //   },
  // },
});

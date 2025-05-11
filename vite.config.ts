import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  clearScreen: false,
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  root: "./src/client",
  base: "/",
  publicDir: "./assets/",
  build: {
    lib: {
      entry: "./game.tsx",
      fileName: "bundle",
      formats: ["es"],
    },
    outDir: "../../build",
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [
        // "react",
        // "react-dom",
        //   "@openhotel/pixi-components",
        //   "@oh/utils",
      ],
      output: {
        manualChunks: () => "everything",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://github.com/openhotel/openhotel/issues/469
const PROXY_URL =
  process.platform === "win32"
    ? "http://127.0.0.1:29940"
    : "http://localhost:29940";

const getHash = () => Math.floor(Math.random() * 90000) + 10000;

export default defineConfig({
  clearScreen: false,
  server: {
    port: 2994,
    proxy: {
      "/proxy": {
        target: PROXY_URL,
        ws: true,
      },
    },
    hmr: true,
    allowedHosts: ["hotel.local"],
  },
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  root: "./src",
  base: "",
  publicDir: "./assets/",
  build: {
    outDir: "../../../build/client",
    emptyOutDir: false, // also necessary
    rollupOptions: {
      output: {
        entryFileNames: `[name]${getHash()}.js`,
        chunkFileNames: `[name]${getHash()}.js`,
        assetFileNames: `[name]${getHash()}.js`,
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
  define: {
    __APP_DATA: `{ "version": "__VERSION__", "gameId": "__GAME_ID__" }`,
  },
});

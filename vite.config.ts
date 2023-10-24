import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/admin/v1": {
          target: loadEnv(mode, process.cwd()).VITE_APP_API_HOST,
          changeOrigin: true,
        },
      },
    },
  });

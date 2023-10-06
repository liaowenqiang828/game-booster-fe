import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/admin/v1": {
        target: "http://124.221.34.225:10002",
        changeOrigin: true,
      },
    },
  },
});

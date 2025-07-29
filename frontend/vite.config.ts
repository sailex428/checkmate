import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/ws": {
        target: "ws://localhost:8080",
        ws: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // configure: (proxy) => {
        //   proxy.on("error", (err) => {
        //     console.log("proxy error", err);
        //   });
        //   proxy.on("proxyReq", (_, req) => {
        //     console.log("Sending Request to the Target:", req.method, req.url);
        //   });
        //   proxy.on("proxyRes", (proxyRes, req) => {
        //     console.log(
        //       "Received Response from the Target:",
        //       proxyRes.statusCode,
        //       req.url,
        //     );
        //   });
        // },
      },
    },
  },
});

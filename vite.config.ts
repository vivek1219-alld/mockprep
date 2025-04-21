import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"), // ✅ base folder
  base: '/',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist"), // ✅ this is what Vercel uses
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  }
});

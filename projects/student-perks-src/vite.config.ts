import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/projects/student-perks/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    // Built static site is served at /projects/student-perks/
    outDir: path.resolve(__dirname, "../student-perks"),
    emptyOutDir: true,
  },
});

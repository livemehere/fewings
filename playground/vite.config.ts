import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import resolvePaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [resolvePaths(), react()],
});

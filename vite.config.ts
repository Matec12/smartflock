import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "SMARTFLOCK",
    short_name: "SMARTFLOCK",
    description: "An app that digitizes poultry management system",
    start_url: "/",
    display: "standalone",
    theme_color: "#03440C",
    background_color: "#ffffff",
    scope: "/",
    orientation: "portrait",
    icons: [
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      }
    ]
  }
};

export default defineConfig({
  // base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});

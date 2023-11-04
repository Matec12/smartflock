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
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "masked-icon.svg",
        sizes: "225x225",
        type: "image/svg+xml",
        purpose: "any maskable"
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

// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      options: {
        variants: [
          {
            src: ["public/fonts/Poppins-Regular.woff2"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["public/fonts/Poppins-Medium.woff2"],
            weight: "500",
            style: "normal",
          },
          {
            src: ["public/fonts/Poppins-Bold.woff2"],
            weight: "700",
            style: "normal",
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
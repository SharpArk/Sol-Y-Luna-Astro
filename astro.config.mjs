// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",

  env: {
    schema: {
      API_URL: envField.string({ context: "server", access: "public" }),
      PUBLIC_API_URL: envField.string({
        context: "client",
        access: "public",
      }),
      JWT_SECRET: envField.string({ context: "server", access: "secret" }),
    },
  },

  prefetch: {
    prefetchAll: true,
  },

  integrations: [react()],

  adapter: node({
    mode: "standalone",
  }),
});
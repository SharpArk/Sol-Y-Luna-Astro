// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  env: {
    schema: {
      API_URL: envField.string({ context: "server", access: "secret" }),
    },
  },
});

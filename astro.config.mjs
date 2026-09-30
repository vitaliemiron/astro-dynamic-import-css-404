import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// inlineStylesheets defaults to "auto": sheets under 4 kB are inlined.
export default defineConfig({ integrations: [svelte()] });

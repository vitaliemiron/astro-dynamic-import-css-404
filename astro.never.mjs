import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// Control: no inlining. The CSS is emitted but under a different file name,
// so the preload URL still 404s.
export default defineConfig({ integrations: [svelte()], build: { inlineStylesheets: "never" } });

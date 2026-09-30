# Astro: dynamic import preloads a CSS file that is not in `dist/`

Repro for an Astro 7.3.5 build bug. A client island lazily imports a module
that pulls in a component which is also a hydrated island on the same page.
The built chunk preloads that component's CSS file, but the file is not in the
build output, so the browser request 404s.

```sh
npm install
npm run build        # prints: Page.*.js references missing Grid.*.css
npm run preview      # open http://localhost:4321, click "Open modal", see the CSS 404 in Network
```

`npm run build:never` uses `build.inlineStylesheets: "never"`. The CSS is then
emitted as `index.<hash>.css`, but the chunk still preloads `Grid.<hash>.css`,
so it 404s too.

- `src/pages/index.astro` renders `<Grid client:load />` and `<Page client:load />`.
- `src/components/Page.svelte` does `import("./LazyModal.svelte")` on click.
- `src/components/LazyModal.svelte` statically imports `Grid.svelte`.
- `src/components/Grid.svelte` imports `grid.module.css`. A plain `.css` import
  or a Svelte `<style>` block gives the same result.
- `check-missing.mjs` lists CSS file names in `dist/_astro/*.js` that are not in `dist/_astro/`.

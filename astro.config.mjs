import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const bridge = (name) => fileURLToPath(new URL(`./vendor/${name}.mjs`, import.meta.url));

/* Parameter tables carry their column header on every cell as data-label, which
   the mobile stylesheet uses to stack them into label/value rows. The labels are
   written into the markdown HTML rather than added by a rehype plugin: the
   tables arrive as raw HTML blocks, so a rehype visitor never sees them as
   elements unless rehype-raw is also installed. */
export default defineConfig({
  site: 'https://ruibitpower.com',
  output: 'static',
  vite: {
    /* yaml and picomatch both ship CommonJS only, and Astro's content layer
       imports them while generating collection types. Vite's SSR module runner
       evaluates those files as ESM, so their `require` calls throw and
       `astro sync` aborts with [GenerateContentTypesError].

       Aliasing them to vendor/*.mjs keeps the import graph ESM while Node itself
       loads the CommonJS implementation through createRequire. Fixing one
       package at a time inline was the previous approach; it only moved the
       error to the next package. */
    resolve: {
      alias: [
        { find: /^yaml$/, replacement: bridge('yaml') },
        { find: /^picomatch$/, replacement: bridge('picomatch') },
      ],
    },
  },
});

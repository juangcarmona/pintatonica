import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './src',
  publicDir: './src/public',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
});

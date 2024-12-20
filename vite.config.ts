import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import Markdown from "unplugin-vue-markdown/vite";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("swiper-"),
        },
      },
    }),
    ViteImageOptimizer({
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
          },
        ],
      },
      png: {
        quality: 100,
      },
      webp: {
        lossless: false,
      },
    }),
    Pages({
      extensions: ["vue", "md"],
    }),
    Markdown({
      headEnabled: true,
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
  ssgOptions: {
    script: "async",
    formatting: "prettify",
  },
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      { find: "@assets", replacement: fileURLToPath(new URL("./src/assets/images", import.meta.url)) }
    ],
  },
});

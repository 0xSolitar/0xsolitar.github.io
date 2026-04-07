import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

import sitemap from "@astrojs/sitemap";

function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      const data = node.data || (node.data = {});
      data.hName = "div";
      data.hProperties = { class: `admonition admonition-${node.name}` };
    });
  };
}

export default defineConfig({
  site: "https://0xsolitar.github.io",
  output: "static",

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: false,
    },
    remarkPlugins: [remarkDirective, remarkAdmonitions],
  },

  integrations: [sitemap()]
});
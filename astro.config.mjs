// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// For a GitHub user site (repo named <user>.github.io), the site is served
// from the domain root, so no `base` path is required.
// If you later move to a project site (e.g. .../blog), add: base: "/blog".
export default defineConfig({
  site: "https://inigo-cobian.github.io",
  // MDX lets posts embed interactive components (maps, charts) inline.
  integrations: [mdx()],
});

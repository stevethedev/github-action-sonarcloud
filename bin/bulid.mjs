import { build } from "esbuild";

const SVG_ICON_BASE_URL =
  process.env.SVG_ICON_BASE_URL ??
  "https://raw.githubusercontent.com/stevethedev/github-action-sonarcloud/main/svg/";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/index.js",
  define: {
    "process.env.SVG_ICON_BASE_URL": JSON.stringify(SVG_ICON_BASE_URL),
  },
});

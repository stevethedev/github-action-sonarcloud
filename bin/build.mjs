import { buildSync } from "esbuild";
import { rmdirSync } from "fs";

const SVG_ICON_BASE_URL =
  process.env.SVG_ICON_BASE_URL ??
  "https://raw.githubusercontent.com/stevethedev/github-action-sonarcloud/main/svg/";

try {
  rmdirSync("dist", { recursive: true });
} catch (_) {
  // ignore
}
buildSync({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/index.js",
  target: "node20",
  define: {
    "process.env.SVG_ICON_BASE_URL": JSON.stringify(SVG_ICON_BASE_URL),
  },
});

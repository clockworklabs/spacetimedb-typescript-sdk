import { defineConfig } from "tsup";

export default defineConfig([
  {
    entryPoints: {
      index: "src/index.ts",
    },
    format: ["esm"],
    target: "es2022",
    legacyOutput: false,
    dts: {
      resolve: true,
    },
    clean: true,
    platform: "browser",
    noExternal: [/.+/, "ws"],
    treeshake: "smallest",
  },
  {
    entryPoints: {
      index: "src/index.ts",
    },
    format: ["esm"],
    target: "es2022",
    outDir: "dist/min",
    dts: false,
    sourcemap: true,
    noExternal: [/.*/],
    treeshake: "smallest",
    minify: "terser",
    platform: "browser",
  },
]);

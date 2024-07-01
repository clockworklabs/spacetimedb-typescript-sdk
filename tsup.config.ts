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
      resolve: false,
    },
    clean: true,
    platform: "browser",
    noExternal: [/.+/],
    treeshake: "smallest",
    // esbuildPlugins: [forceBundleBufferPlugin],
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
    // esbuildPlugins: [forceBundleBufferPlugin],
  },
]);

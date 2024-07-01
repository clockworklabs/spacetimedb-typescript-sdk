import { defineConfig } from "tsup";

export default defineConfig([
  {
    entryPoints: {
      index: "src/index.ts",
    },
    outExtension: ({}) => ({ js: ".js", dts: ".d.ts" }),
    format: ["esm"],
    target: "es2022",
    legacyOutput: false,
    dts: {
      resolve: false,
    },
    sourcemap: true,
    clean: true,
    external: ["brotli"],
    treeshake: "smallest",
  },
  {
    entryPoints: {
      index: "src/index.ts",
    },
    outExtension: ({}) => ({ js: ".js", dts: ".d.ts" }),
    format: ["esm"],
    target: "es2022",
    outDir: "dist/min",
    legacyOutput: false,
    dts: false,
    sourcemap: true,
    clean: true,
    // noExternal: [/.+/],
    treeshake: "smallest",
    minify: "terser",
  },
]);

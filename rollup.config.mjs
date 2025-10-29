import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "sidepanel/index.js",
    output: {
      file: "dist/sidepanel/index.bundle.min.js", // Output bundle file
      name: "ChromeBuiltInAISidePanelApp", // Global variable name for the bundle
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      terser(),
      copy({
        targets: [
          {
            src: ["manifest.json", "background.js", "sidepanel", "images"],
            dest: "dist",
          },
        ],
      }),
    ],
  },
];

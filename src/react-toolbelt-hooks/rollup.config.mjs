import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';
import summary from 'rollup-plugin-summary';

const input = 'src/index.ts';
// Read package.json
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url).pathname)
);
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    input,
    output: [
      {
        format: 'cjs',
        dir: path.dirname(pkg.main),
        preserveModules: true,
        preserveModulesRoot: path.resolve(__dirname, 'src'),
        entryFileNames: '[name].js',
        exports: 'named'
      },
      {
        format: 'esm',
        dir: path.dirname(pkg.module),
        preserveModules: true,
        preserveModulesRoot: path.resolve(__dirname, 'src'),
        entryFileNames: '[name].js'
      }
    ],
    external: [/@babel\/runtime/, 'react', '@react-toolbelt/utils'],
    plugins: [
      externals(),
      typescript(),
      nodeResolve({ extensions }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        extensions,
        envName: 'production',
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime']
      }),
      terser(),
      summary({ showMinifiedSize: true, showGzippedSize: true })
    ]
  }
];

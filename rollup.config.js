import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

import postcss from 'rollup-plugin-postcss'

import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = await import('./package.json', {
	assert: {
		type: 'json'
	}
})

export default [
	{
	  input: "src/index.ts",
	  output: [
		{
		  file: 'dist/cjs/index.js',
		  format: "cjs",
		  sourcemap: true,
		},
		{
		  file: 'dist/esm/index.js',
		  format: "esm",
		  sourcemap: true,
		},
	  ],
	  plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({ tsconfig: "./tsconfig.json" }),
		postcss(),
		
		terser(),
	  ],
	},
	{
	  input: "dist/esm/types/src/index.d.ts",
	  output: [{ file: "dist/index.d.ts", format: "esm" }],
	  plugins: [dts()],
  
	  external: [/\.css$/], // telling rollup anything that is .css aren't part of type exports 
	},
  ]
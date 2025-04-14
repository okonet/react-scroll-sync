import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json';

export default defineConfig(() => ({
  plugins: [
    react(),
    dts(),
  ],
  build: {
    lib: {
        entry: {
            index: resolve(__dirname, 'src/index.ts'),
        },
        formats: ['es','cjs','umd'],
        name: 'ReactScrollSync',
        fileName: (format, entryName) => {
            switch (format) {
            case 'umd':
                return `${entryName}.umd.js`;
            case 'cjs':
                return `${entryName}.cjs.js`;
            default:
                return `${entryName}.mjs`;
            }
        },
    },
    rollupOptions: {
        external: [...Object.keys(packageJson.peerDependencies)],
        output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
        },
    },
  },
}))
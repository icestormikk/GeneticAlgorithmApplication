import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import {rmSync} from 'fs';
import electron from 'vite-plugin-electron';
import pkg from './package.json';
import renderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig( ({command}) =>{
  rmSync('dist-electron', {recursive: true, force: true});

  const isServe = command === 'serve';
  const isBuild = command === 'build';

  return {
    server: (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
      return {
        host: url.hostname,
        port: +url.port,
      };
    })(),
    clearScreen: false,
    plugins: [
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      electron([
        {
          entry: 'electron/main/index.ts',
          onstart(options) {
            options.startup();
          },
          vite: {
            build: {
              sourcemap: isServe,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ?
                  pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart(options) {
            options.reload();
          },
          vite: {
            build: {
              sourcemap: isServe,
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ?
                  pkg.dependencies : {}),
              },
            },
          },
        },
      ]),
      renderer({
        nodeIntegration: true,
      }),
    ],
  };
});

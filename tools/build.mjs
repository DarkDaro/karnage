import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const release = join(root, 'release');
const entry = join(root, 'src', 'main.js');
const args = new Set(process.argv.slice(2));
const minify = args.has('--minify');

await mkdir(release, { recursive: true });
await cp(join(root, 'assets'), join(release, 'assets'), { recursive: true });

const bundle = await build({
  entryPoints: [entry],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  minify,
  legalComments: 'none'
});
await writeFile(join(release, 'app.js'), bundle.outputFiles[0].text, 'utf8');

const html = await readFile(join(root, 'index.html'), 'utf8');
const releaseHtml = html.replace(
  /<script type="module" src="\.\/src\/main\.js"><\/script>/,
  '<script src="./app.js"></script>'
);
if (releaseHtml === html) {
  throw new Error('build: module script tag not found in index.html');
}
await writeFile(join(release, 'index.html'), releaseHtml, 'utf8');

await writeFile(
  join(release, 'README.txt'),
  [
    'KARNAGE',
    'Открой index.html в браузере.',
    'Сборка: node tools/build.mjs',
    'Исходники: ../src, ассеты: assets',
    ''
  ].join('\n'),
  'utf8'
);

console.log(`build: ${join(release, 'index.html')}${minify ? ' (minified app.js)' : ''}`);

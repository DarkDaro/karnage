import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}

const files = (await walk(root)).filter((path) => {
  const rel = path.slice(root.length + 1).replaceAll('\\', '/');
  if (rel.startsWith('archive/') || rel.startsWith('release/') || rel.startsWith('test-results/')) return false;
  return extname(path) === '.js' || extname(path) === '.mjs';
});

const failures = [];
for (const file of files) {
  const rel = file.slice(root.length + 1);
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) failures.push(`${rel}\n${result.stderr.trim()}`);
}

const legacy = await readFile(join(root, 'src', 'legacy', 'karnage.js'), 'utf8');
if (!legacy.includes('requestAnimationFrame(loop)')) {
  failures.push('src/legacy/karnage.js: loop start not found');
}

if (failures.length) {
  console.error(failures.join('\n\n'));
  process.exit(1);
}
console.log(`check: ${files.length} JS files OK`);

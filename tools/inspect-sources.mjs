import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const dir = path.join(path.resolve(import.meta.dirname, '..'), 'assets-source', 'dawnice');

for (const file of readdirSync(dir).sort()) {
  const full = path.join(dir, file);
  try {
    const meta = await sharp(full).metadata();
    const kb = Math.round(statSync(full).size / 1024);
    const ratio = (meta.width / meta.height).toFixed(3);
    const bigEnough = meta.width >= 800 ? 'OK  ' : 'SMALL';
    console.log(
      `${file.padEnd(24)} ${bigEnough} ${String(meta.width + 'x' + meta.height).padEnd(12)} ${('ratio ' + ratio).padEnd(14)} ${String(kb + 'KB').padStart(7)}  ${meta.format}  ${meta.hasAlpha ? 'alpha' : 'opaque'}`
    );
  } catch (error) {
    console.log(`${file.padEnd(24)} ERROR ${error.message}`);
  }
}

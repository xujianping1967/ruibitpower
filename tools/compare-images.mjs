/**
 * Compare two images perceptually: are factory.jpg and hero-bess.webp the same
 * picture? If they are, the homepage would show the identical photo twice —
 * once as the hero and once captioned "Manufacturing facility".
 */
import sharp from 'sharp';
import path from 'node:path';

const images = path.join(path.resolve(import.meta.dirname, '..'), 'public', 'assets', 'images');

const W = 96;
const H = 32;

const sample = async (file) => {
  const { data } = await sharp(path.join(images, file))
    .resize(W, H, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
};

const meanAbsDiff = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum / a.length;
};

const a = await sample('factory.jpg');
const b = await sample('hero-bess.webp');
const diff = meanAbsDiff(a, b);

console.log(`factory.jpg vs hero-bess.webp : mean abs diff = ${diff.toFixed(2)} / 255`);
console.log(diff < 6 ? 'VERDICT: SAME IMAGE' : diff < 18 ? 'VERDICT: RELATED / very similar' : 'VERDICT: DIFFERENT images');

// Also list every image in public/ and whether it differs from the hero
console.log('\nComparison of hero-bess.webp against the other large assets:');
for (const file of [
  'factory.jpg',
  'office.webp',
  'container-bess.jpg',
  'cabinet-ess.jpg',
  'home-system.jpg',
  'wall-battery.jpg',
  'abuja.jpg',
  'estonia.jpg',
  'hybrid-inverter.webp',
]) {
  try {
    const s = await sample(file);
    const d = meanAbsDiff(a, s);
    console.log(`  ${file.padEnd(24)} diff=${d.toFixed(2).padStart(6)}  ${d < 6 ? '<= duplicate of hero' : d < 18 ? 'similar' : 'distinct'}`);
  } catch (error) {
    console.log(`  ${file.padEnd(24)} ERROR ${error.message}`);
  }
}

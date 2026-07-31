import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSvgIcon(size, padding = 0, isMaskable = false) {
  const innerSize = size - (padding * 2);
  const offset = padding;
  
  // Background rect (for padded/maskable icons)
  const bg = `<rect width="${size}" height="${size}" rx="${isMaskable ? 0 : Math.round(size * 0.22)}" fill="#0F172A"/>`;
  
  // Dynamic scaled VayuCare Icon inside container
  // Base viewBox: 0 0 64 64
  const scale = innerSize / 64;
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg}
  <g transform="translate(${offset}, ${offset}) scale(${scale})">
    <!-- Airflow V Symbol -->
    <path d="M12 14C20 34 27 48 32 48C37 48 44 34 52 14C42 24 37 36 32 36C27 36 22 24 12 14Z" fill="#38BDF8"/>
    <path d="M20 12C26 26 29 34 32 34C35 34 38 26 44 12C38 18 35 24 32 24C29 24 26 18 20 12Z" fill="#10B981" opacity="0.9"/>
    <circle cx="32" cy="18" r="4.5" fill="#FFFFFF"/>
  </g>
</svg>`;

  return svg;
}

const sizes = [48, 72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

sizes.forEach(size => {
  const padding = Math.round(size * 0.15);
  const svgContent = generateSvgIcon(size, padding, false);
  fs.writeFileSync(path.join(publicDir, `icon-${size}x${size}.svg`), svgContent);
});

// Maskable icon 512x512
const maskableSvg = generateSvgIcon(512, Math.round(512 * 0.18), true);
fs.writeFileSync(path.join(publicDir, 'icon-512x512-maskable.svg'), maskableSvg);

// Apple Touch Icon
const appleIcon = generateSvgIcon(180, Math.round(180 * 0.15), false);
fs.writeFileSync(path.join(__dirname, 'public', 'apple-touch-icon.png.svg'), appleIcon);

console.log('Icons generated successfully in public/icons');

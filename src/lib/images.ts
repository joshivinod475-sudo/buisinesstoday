// Every article image is served in fixed crops so Google Discover, Google News
// and social cards always get a large, correctly shaped picture.
//
//  - Unsplash URLs are resized by Unsplash itself.
//  - Files in public/images/ are cropped by scripts/make-images.mjs before each
//    build, into public/images/v/<name>-<width>x<height>.jpg.
//
// If you add a size here, add it to SIZES in scripts/make-images.mjs as well.
import { SITE } from '../site.config';

export const WIDE = [
  [800, 450],
  [1200, 675],
  [1600, 900],
] as const;

export function img(src: string, w: number, h: number): string {
  if (src.includes('images.unsplash.com')) {
    const u = new URL(src);
    u.search = '';
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    u.searchParams.set('w', String(w));
    u.searchParams.set('h', String(h));
    u.searchParams.set('q', '80');
    return u.href;
  }
  const local = src.match(/^\/images\/([^/]+)\.(jpe?g|png|webp)$/i);
  if (local) return `/images/v/${local[1]}-${w}x${h}.jpg`;
  return src;
}

export function abs(path: string): string {
  return new URL(path, SITE.url).href;
}

/** 16:9 srcset for cards and lead images. */
export function srcset(src: string): string {
  return WIDE.map(([w, h]) => `${img(src, w, h)} ${w}w`).join(', ');
}

/** The three shapes Google asks for in article schema: 16:9, 4:3 and 1:1. */
export function schemaImages(src: string): string[] {
  return [abs(img(src, 1600, 900)), abs(img(src, 1600, 1200)), abs(img(src, 1200, 1200))];
}

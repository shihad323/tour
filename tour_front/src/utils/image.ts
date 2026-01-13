export const resolveImageSrc = (options: {
  img?: string | undefined;
  slug?: string | undefined;
  title?: string | undefined;
  index?: number | undefined;
}) => {
  const { img, slug, title, index } = options;

  // If explicit image provided (filename or URL)
  if (img) {
    // If it's already a full URL, return as-is
    if (/^(https?:)?\/\//.test(img)) return img;

    // If it's an absolute path coming from backend (e.g. '/uploads/..'),
    // prefix it with the API origin so the browser requests the backend server.
    if (img.startsWith('/uploads') || img.startsWith('uploads/')) {
      const api = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';
      const origin = api.replace(/\/api\/v1\/?$/, '');
      // ensure leading slash
      const path = img.startsWith('/') ? img : `/${img}`;
      return `${origin}${path}`;
    }

    // If it's an absolute path to frontend asset (like '/tour_images/...'), keep it as-is
    if (img.startsWith('/')) return img;

    // Otherwise treat as filename from legacy data and map to public `tour_images`
    return `/tour_images/${img}`;
  }

  // Build base name from title first word (preferred) or slug
  const baseFromTitle = (str: string) =>
    str
      .toString()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-_]/g, '')
      .split(/[\s-_]+/)[0] || 'default';

  const base = title ? baseFromTitle(title) : slug ? baseFromTitle(slug) : 'default';
  const n = index !== undefined ? index + 1 : 1;

  // New naming convention: <firstword>_1.jpg, <firstword>_2.jpg, ...
  return `/tour_images/${base}_${n}.jpg`;
};

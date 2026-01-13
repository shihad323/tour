Place tour images here for local serving by the frontend.

Single-image naming:
- By slug: If you name an image using the tour's `slug`, e.g. `sundarbans-adventure.jpg`, the app will try `/tour_images/<slug>.jpg` when no `tour.images` entries are provided.

Multiple images (gallery, up to 5):
- Numbered by slug/title first word: Name files as `<firstword>_1.jpg`, `<firstword>_2.jpg`, ..., `<firstword>_5.jpg` where `<firstword>` is the first word of the tour title (lowercased, special chars removed). Example: `Maldives Escape` → `maldives_1.jpg`.
- Explicit filenames: Alternatively, set `tour.images` to an array of filenames (or full URLs). Example:

```
tour.images = [
	'sundarbans-1.jpg',
	'sundarbans-2.jpg',
	'sundarbans-3.jpg',
	'sundarbans-4.jpg',
	'sundarbans-5.jpg'
]
```

Behavior notes:
- If `tour.images[i]` is a full URL (starting with `http://` or `https://`) it will be used directly.
- If `tour.images[i]` is a filename (e.g. `sandy-1.jpg`), the app will request `/tour_images/sandy-1.jpg`.
- If there is no `tour.images[i]`, the app falls back to `/tour_images/<slug>-<i+1>.jpg`.

For development with Vite, files in `public/` are served at the project root, so the images will be available at `/tour_images/<name>`.

Keep filenames consistent and add up to five images per tour to ensure the gallery displays correctly.

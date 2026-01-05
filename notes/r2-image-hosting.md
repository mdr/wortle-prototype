# R2 Image Hosting

Images are hosted on Cloudflare R2 with a custom domain.

## Buckets

| Bucket             | Purpose                | Access                         |
| ------------------ | ---------------------- | ------------------------------ |
| `wortle-originals` | Original source images | Private (S3 API only)          |
| `wortle-images`    | Optimized web images   | Public via `images.wortle.app` |

Infrastructure managed in `infra/index.ts` via Pulumi.

## Image Variants

Each source image is converted to WebP at multiple widths:

- 200w - thumbnails
- 400w - small mobile
- 800w - mobile/tablet
- 1200w - desktop
- 1600w - large displays
- 2400w - zoom/fullscreen

Quality: 80

## Paths

**Originals:** `wortle-originals/{puzzleId}/{filename}.jpg`

**Optimized:** `wortle-images/puzzles/{puzzleId}/{filename}-{width}.webp`

**Public URL:** `https://images.wortle.app/puzzles/{puzzleId}/{filename}-{width}.webp`

Example: `https://images.wortle.app/puzzles/40/whole-plant-800.webp`

## Scripts

### Generate optimized images

```bash
nix develop -c pnpm tsx scripts/generate-images.ts
```

Reads from `public/images/`, outputs to `dist/optimized-images/`.

### Upload to R2

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` env vars.

```bash
# Upload originals
for file in public/images/*/*; do
  key="${file#public/images/}"
  nix develop -c pnpm dlx wrangler r2 object put "wortle-originals/$key" --file="$file" --remote
done

# Upload optimized
for f in dist/optimized-images/*/*; do
  rel="${f#dist/optimized-images/}"
  key="puzzles/$rel"
  nix develop -c pnpm dlx wrangler r2 object put "wortle-images/$key" --file="$f" --remote
done
```

## API Token

Wrangler requires a **Cloudflare API Token** (not an R2 API Token) with:

- Permission: Account → Workers R2 Storage → Edit
- Created at: https://dash.cloudflare.com/profile/api-tokens

## Usage in App

```html
<img
  src="https://images.wortle.app/puzzles/40/whole-plant-800.webp"
  srcset="
    https://images.wortle.app/puzzles/40/whole-plant-200.webp   200w,
    https://images.wortle.app/puzzles/40/whole-plant-400.webp   400w,
    https://images.wortle.app/puzzles/40/whole-plant-800.webp   800w,
    https://images.wortle.app/puzzles/40/whole-plant-1200.webp 1200w,
    https://images.wortle.app/puzzles/40/whole-plant-1600.webp 1600w,
    https://images.wortle.app/puzzles/40/whole-plant-2400.webp 2400w
  "
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Whole plant"
  loading="lazy"
/>
```

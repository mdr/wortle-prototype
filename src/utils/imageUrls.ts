const R2_BASE_URL = "https://images.wortle.app/puzzles"
const WIDTHS = [200, 400, 800, 1200, 1600, 2400] as const

export type ImageWidth = (typeof WIDTHS)[number]

/**
 * Generate a single image URL for a specific width
 * @param imageKey - The image key, e.g., "40/whole-plant"
 * @param width - The desired width
 */
export const imageUrl = (imageKey: string, width: ImageWidth): string => `${R2_BASE_URL}/${imageKey}-${width}.webp`

/**
 * Generate srcset string for responsive images
 * @param imageKey - The image key, e.g., "40/whole-plant"
 * @param widths - Optional subset of widths to include (defaults to all)
 */
export const imageSrcSet = (imageKey: string, widths: readonly ImageWidth[] = WIDTHS): string =>
  widths.map((w) => `${imageUrl(imageKey, w)} ${w}w`).join(", ")

/**
 * Preset srcset configurations for different use cases
 */
export const srcSetPresets = {
  /** Thumbnails: 200, 400 */
  thumbnail: [200, 400] as const,
  /** Gallery viewer: 400, 800, 1200 */
  viewer: [400, 800, 1200] as const,
  /** Fullscreen with zoom: all sizes */
  fullscreen: WIDTHS,
}

import type { ImageKey, PuzzleId } from "@/lib/Puzzle"

import { Url } from "./brandedTypes"

const R2_BASE_URL = "https://images.wortle.app/puzzles"
const WIDTHS = [200, 400, 800, 1200, 1600, 2400] as const

export type ImageWidth = (typeof WIDTHS)[number]

export const imageUrl = (puzzleId: PuzzleId, imageKey: ImageKey, width: ImageWidth): Url =>
  Url(`${R2_BASE_URL}/${puzzleId}/${imageKey}-${width}.webp`)

export const imageSrcSet = (puzzleId: PuzzleId, imageKey: ImageKey, widths: readonly ImageWidth[] = WIDTHS): string =>
  widths.map((w) => `${imageUrl(puzzleId, imageKey, w)} ${w}w`).join(", ")

export const srcSetPresets = {
  thumbnail: [200, 400] as const,
  viewer: [400, 800, 1200] as const,
  fullscreen: WIDTHS,
}

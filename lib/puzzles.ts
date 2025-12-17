import { PlantId } from "./plants"

export interface Puzzle {
  id: number
  date: string
  plantId: PlantId
  observationDate: string
  location: string
  coordinates: { lat: number; lng: number }
  habitat: string
  images: Array<{ url: string; caption: string }>
  photoAttribution: {
    photographer: string
    license: string
  }
}

export const puzzles: Record<number, Puzzle> = {
  67: {
    id: 67,
    date: "2026-06-10",
    plantId: 2, // Tansy
    observationDate: "2023-08-03",
    location: "North Yorkshire, England",
    coordinates: { lat: 53.9788528, lng: -1.3101916 },
    habitat: "Flood meadow",
    images: [
      { url: "/images/67/plant.jpg", caption: "Whole plant" },
      { url: "/images/67/flower-closeup.jpg", caption: "Flower heads" },
      { url: "/images/67/leaves.jpg", caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
  68: {
    id: 68,
    date: "2026-06-11",
    plantId: 1, // Devil's-bit Scabious
    observationDate: "2025-08-13",
    location: "Northumberland, England",
    coordinates: { lat: 55.2267806, lng: -2.5802806 },
    habitat: "Woodland",
    images: [
      { url: "/images/68/flower-head.jpg", caption: "Flower head" },
      { url: "/images/68/flower-rear.jpg", caption: "Rear view of flower" },
      { url: "/images/68/flower-closeup.jpg", caption: "Close up of flower head" },
      { url: "/images/68/leaves.jpg", caption: "Leaves" },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
  },
}

export function getPuzzle(id: number): Puzzle | undefined {
  return puzzles[id]
}

export function getAllPuzzleIds(): number[] {
  return Object.keys(puzzles).map(Number)
}

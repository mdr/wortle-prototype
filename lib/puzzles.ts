export interface Puzzle {
  id: number
  date: string
  observationDate: string
  location: string
  coordinates: { lat: number; lng: number }
  habitat: string
  correctAnswer: {
    scientificName: string
    commonNames: string[]
  }
  links: Array<{ name: string; url: string }>
  images: Array<{ url: string; caption: string }>
  photoAttribution: {
    photographer: string
    license: string
  }
  idTips: string[]
}

export const puzzles: Record<number, Puzzle> = {
  67: {
    id: 67,
    date: "2026-06-10",
    observationDate: "2023-08-03",
    location: "North Yorkshire, England",
    coordinates: { lat: 53.9788528, lng: -1.3101916 },
    habitat: "Flood meadow",
    correctAnswer: {
      scientificName: "Tanacetum vulgare",
      commonNames: ["Tansy"],
    },
    links: [
      {
        name: "Plant Atlas",
        url: "https://plantatlas2020.org/atlas/2cd4p9h.cdb",
      },
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Tanacetum_vulgare",
      },
    ],
    images: [
      {
        url: "/images/67/plant.jpg",
        caption: "Whole plant",
      },
      {
        url: "/images/67/flower-closeup.jpg",
        caption: "Flower heads",
      },
      {
        url: "/images/67/leaves.jpg",
        caption: "Leaves",
      },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
    idTips: [
      "Button-like yellow flower heads without ray florets",
      "Leaves pinnately divided with toothed segments",
      "Strong aromatic smell when crushed",
    ],
  },
  68: {
    id: 68,
    date: "2026-06-11",
    observationDate: "2025-08-13",
    location: "Northumberland, England",
    coordinates: { lat: 55.2267806, lng: -2.5802806 },
    habitat: "Woodland",
    correctAnswer: {
      scientificName: "Succisa pratensis",
      commonNames: ["Devil's-bit Scabious", "Devil's-bit"],
    },
    links: [
      {
        name: "Plant Atlas",
        url: "https://plantatlas2020.org/atlas/2cd4p9h.23w",
      },
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Succisa_pratensis",
      },
      {
        name: "NatureSpot",
        url: "https://www.naturespot.org/species/devils-bit-scabious",
      },
      {
        name: "Flora of East Anglia",
        url: "http://webidguides.com/_templates/group_scabious.html#Devil's-bit%20Scabious",
      },
    ],
    images: [
      {
        url: "/images/68/flower-head.jpg",
        caption: "Flower head",
      },
      {
        url: "/images/68/flower-rear.jpg",
        caption: "Rear view of flower",
      },
      {
        url: "/images/68/flower-closeup.jpg",
        caption: "Close up of flower head",
      },
      {
        url: "/images/68/leaves.jpg",
        caption: "Leaves",
      },
    ],
    photoAttribution: {
      photographer: "Matt Russell",
      license: "CC-BY 4.0",
    },
    idTips: [
      "Flower heads rounded with equal sized florets",
      "All leaves entire",
      "Corolla 4-lobed",
    ],
  },
}

export function getPuzzle(id: number): Puzzle | undefined {
  return puzzles[id]
}

export function getAllPuzzleIds(): number[] {
  return Object.keys(puzzles).map(Number)
}

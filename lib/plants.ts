export type PlantId = number

export interface Plant {
  id: PlantId
  scientificName: string
  commonNames: string[]
  links: Array<{ name: string; url: string }>
  idTips: string[]
}

export const plants: Record<PlantId, Plant> = {
  1: {
    id: 1,
    scientificName: "Succisa pratensis",
    commonNames: ["Devil's-bit Scabious", "Devil's-bit"],
    links: [
      { name: "Plant Atlas", url: "https://plantatlas2020.org/atlas/2cd4p9h.23w" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Succisa_pratensis" },
      { name: "NatureSpot", url: "https://www.naturespot.org/species/devils-bit-scabious" },
      { name: "Flora of East Anglia", url: "http://webidguides.com/_templates/group_scabious.html#Devil's-bit%20Scabious" },
    ],
    idTips: [
      "Flower heads rounded with equal sized [[floret]]s",
      "All leaves [[entire]]",
      "[[corolla]] 4-lobed",
    ],
  },
  2: {
    id: 2,
    scientificName: "Tanacetum vulgare",
    commonNames: ["Tansy"],
    links: [
      { name: "Plant Atlas", url: "https://plantatlas2020.org/atlas/2cd4p9h.9b1" },
      { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tanacetum_vulgare" },
      { name: "NatureSpot", url: "https://www.naturespot.org/species/tansy" },
      { name: "Flora of East Anglia", url: "http://webidguides.com/_templates/group_yellowbutton.html#Common%20Tansy" },
    ],
    idTips: [
      "The plant has bright yellow, button-like flower heads arranged in flat-topped clusters.",
      "The flower heads lack [[ray florets]] and consist only of tightly packed [[disc florets]].",
      "The leaves are deeply divided into many narrow, toothed segments.",
    ],
  },
  3: {
    id: 3,
    scientificName: "Knautia arvensis",
    commonNames: ["Field Scabious"],
    links: [],
    idTips: [],
  },
  4: {
    id: 4,
    scientificName: "Scabiosa columbaria",
    commonNames: ["Small Scabious"],
    links: [],
    idTips: [],
  },
  5: {
    id: 5,
    scientificName: "Hyacinthoides non-scripta",
    commonNames: ["Bluebell"],
    links: [],
    idTips: [],
  },
  6: {
    id: 6,
    scientificName: "Campanula rotundifolia",
    commonNames: ["Harebell"],
    links: [],
    idTips: [],
  },
  7: {
    id: 7,
    scientificName: "Cichorium intybus",
    commonNames: ["Chicory"],
    links: [],
    idTips: [],
  },
  8: {
    id: 8,
    scientificName: "Jasione montana",
    commonNames: ["Sheep's-bit"],
    links: [],
    idTips: [],
  },
  9: {
    id: 9,
    scientificName: "Ranunculus acris",
    commonNames: ["Meadow Buttercup"],
    links: [],
    idTips: [],
  },
  10: {
    id: 10,
    scientificName: "Lotus corniculatus",
    commonNames: ["Bird's-foot Trefoil"],
    links: [],
    idTips: [],
  },
}

export function getPlant(id: PlantId): Plant | undefined {
  return plants[id]
}

export function getAllPlants(): Plant[] {
  return Object.values(plants)
}

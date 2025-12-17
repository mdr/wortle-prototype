import { Brand } from "effect"

export type SpeciesId = number & Brand.Brand<"SpeciesId">
export const SpeciesId = Brand.nominal<SpeciesId>()

export interface Plant {
  id: SpeciesId
  scientificName: string
  commonNames: string[]
  links: Array<{ name: string; url: string }>
  idTips: string[]
}

export const plants: Record<SpeciesId, Plant> = {
  [SpeciesId(1)]: {
    id: SpeciesId(1),
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
      "[[Corolla]] 4-lobed",
    ],
  },
  [SpeciesId(2)]: {
    id: SpeciesId(2),
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
  [SpeciesId(3)]: {
    id: SpeciesId(3),
    scientificName: "Knautia arvensis",
    commonNames: ["Field Scabious"],
    links: [],
    idTips: [],
  },
  [SpeciesId(4)]: {
    id: SpeciesId(4),
    scientificName: "Scabiosa columbaria",
    commonNames: ["Small Scabious"],
    links: [],
    idTips: [],
  },
  [SpeciesId(5)]: {
    id: SpeciesId(5),
    scientificName: "Hyacinthoides non-scripta",
    commonNames: ["Bluebell"],
    links: [],
    idTips: [],
  },
  [SpeciesId(6)]: {
    id: SpeciesId(6),
    scientificName: "Campanula rotundifolia",
    commonNames: ["Harebell"],
    links: [],
    idTips: [],
  },
  [SpeciesId(7)]: {
    id: SpeciesId(7),
    scientificName: "Cichorium intybus",
    commonNames: ["Chicory"],
    links: [],
    idTips: [],
  },
  [SpeciesId(8)]: {
    id: SpeciesId(8),
    scientificName: "Jasione montana",
    commonNames: ["Sheep's-bit"],
    links: [],
    idTips: [],
  },
  [SpeciesId(9)]: {
    id: SpeciesId(9),
    scientificName: "Ranunculus acris",
    commonNames: ["Meadow Buttercup"],
    links: [],
    idTips: [],
  },
  [SpeciesId(10)]: {
    id: SpeciesId(10),
    scientificName: "Lotus corniculatus",
    commonNames: ["Bird's-foot Trefoil"],
    links: [],
    idTips: [],
  },
}

export function getPlant(id: SpeciesId): Plant | undefined {
  return plants[id]
}

export function getAllPlants(): Plant[] {
  return Object.values(plants)
}

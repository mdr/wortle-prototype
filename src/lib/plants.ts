import { type Species, SpeciesId } from "./Species"
import { Url } from "./brandedTypes"

const allPlants: Species[] = [
  {
    id: SpeciesId(1),
    scientificName: "Succisa pratensis",
    family: "Caprifoliaceae",
    commonNames: ["Devil's-bit Scabious", "Devil's-bit"],
    links: [
      { name: "Plant Atlas", url: Url("https://plantatlas2020.org/atlas/2cd4p9h.23w") },
      { name: "Wikipedia", url: Url("https://en.wikipedia.org/wiki/Succisa_pratensis") },
      { name: "NatureSpot", url: Url("https://www.naturespot.org/species/devils-bit-scabious") },
      {
        name: "Flora of East Anglia",
        url: Url("http://webidguides.com/_templates/group_scabious.html#Devil's-bit%20Scabious"),
      },
    ],
    idTips: ["Flower heads rounded with equal sized [[floret]]s", "All leaves [[entire]]", "[[Corolla]] 4-lobed"],
  },
  {
    id: SpeciesId(2),
    scientificName: "Tanacetum vulgare",
    family: "Asteraceae",
    commonNames: ["Tansy"],
    links: [
      { name: "Plant Atlas", url: Url("https://plantatlas2020.org/atlas/2cd4p9h.9b1") },
      { name: "Wikipedia", url: Url("https://en.wikipedia.org/wiki/Tanacetum_vulgare") },
      { name: "NatureSpot", url: Url("https://www.naturespot.org/species/tansy") },
      {
        name: "Flora of East Anglia",
        url: Url("http://webidguides.com/_templates/group_yellowbutton.html#Common%20Tansy"),
      },
    ],
    idTips: [
      "The plant has bright yellow, button-like flower heads arranged in flat-topped clusters.",
      "The flower heads lack [[ray florets]] and consist only of tightly packed [[disc florets]].",
      "The leaves are deeply divided into many narrow, toothed segments.",
    ],
  },
  {
    id: SpeciesId(3),
    scientificName: "Knautia arvensis",
    family: "Caprifoliaceae",
    commonNames: ["Field Scabious"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(4),
    scientificName: "Scabiosa columbaria",
    family: "Caprifoliaceae",
    commonNames: ["Small Scabious"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(5),
    scientificName: "Hyacinthoides non-scripta",
    family: "Asparagaceae",
    commonNames: ["Bluebell"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(6),
    scientificName: "Campanula rotundifolia",
    family: "Campanulaceae",
    commonNames: ["Harebell"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(7),
    scientificName: "Cichorium intybus",
    family: "Asteraceae",
    commonNames: ["Chicory"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(8),
    scientificName: "Jasione montana",
    family: "Campanulaceae",
    commonNames: ["Sheep's-bit"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(9),
    scientificName: "Ranunculus acris",
    family: "Ranunculaceae",
    commonNames: ["Meadow Buttercup"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(10),
    scientificName: "Lotus corniculatus",
    family: "Fabaceae",
    commonNames: ["Bird's-foot Trefoil"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(11),
    scientificName: "Primula farinosa",
    family: "Primulaceae",
    commonNames: ["Bird's-eye Primrose"],
    links: [
      { name: "Plant Atlas", url: Url("https://plantatlas2020.org/atlas/2cd4p9h.94n") },
      { name: "Wikipedia", url: Url("https://en.wikipedia.org/wiki/Primula_farinosa") },
    ],
    idTips: [],
  },
  {
    id: SpeciesId(12),
    scientificName: "Geranium robertianum",
    family: "Geraniaceae",
    commonNames: ["Herb-Robert", "Stinking Bob"],
    links: [
      { name: "Plant Atlas", url: Url("https://plantatlas2020.org/atlas/2cd4p9h.8nb") },
      { name: "Wikipedia", url: Url("https://en.wikipedia.org/wiki/Geranium_robertianum") },
      {
        name: "Flora of East Anglia",
        url: Url("http://webidguides.com/_templates/group_erodium.html#Common%20Herb-Robert"),
      },
      { name: "NatureSpot", url: Url("https://www.naturespot.org/species/herb-robert") },
    ],
    idTips: [],
  },
  {
    id: SpeciesId(13),
    scientificName: "Geranium lucidum",
    family: "Geraniaceae",
    commonNames: ["Shining Crane's-bill"],
    links: [],
    idTips: [],
  },
  {
    id: SpeciesId(14),
    scientificName: "Bellis perennis",
    family: "Asteraceae",
    commonNames: ["Daisy"],
    links: [
      { name: "Plant Atlas", url: Url("https://plantatlas2020.org/atlas/2cd4p9h.xbs") },
      { name: "Wikipedia", url: Url("https://en.wikipedia.org/wiki/Bellis_perennis") },
      { name: "NatureSpot", url: Url("https://www.naturespot.org/species/daisy") },
      {
        name: "Flora of East Anglia",
        url: Url("http://webidguides.com/_templates/group_whitedaisies.html#Common%20Daisy"),
      },
    ],
    idTips: [],
  },
]

export const getSpecies = (id: SpeciesId): Species | undefined => allPlants.find((s) => s.id === id)

export const getAllSpecies = (): Species[] => allPlants

import { Brand } from "effect"
import { Url } from "@/utils/brandedTypes"

export type SpeciesId = number & Brand.Brand<"SpeciesId">
export const SpeciesId = Brand.nominal<SpeciesId>()

export type SpeciesLink = {
  name: string
  url: Url
}

export type Species = {
  id: SpeciesId
  scientificName: string
  family: string
  commonNames: string[]
  links: SpeciesLink[]
  idTips: string[]
}

export const getGenus = (scientificName: string): string => scientificName.split(" ")[0]

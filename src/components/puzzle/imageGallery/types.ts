import { Url } from "@/utils/brandedTypes"

export interface ImageData {
  url: Url
  caption: string
}

export interface Attribution {
  photographer: string
  license: string
}

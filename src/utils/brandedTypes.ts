import { Brand } from "effect"

export type Url = string & Brand.Brand<"Url">
export const Url = Brand.nominal<Url>()

export type Iso8601Date = string & Brand.Brand<"Iso8601Date">
export const Iso8601Date = Brand.nominal<Iso8601Date>()

export type Degrees = number & Brand.Brand<"Degrees">
export const Degrees = Brand.nominal<Degrees>()

export type ClassNameList = string & Brand.Brand<"ClassNameList">
export const ClassNameList = Brand.nominal<ClassNameList>()

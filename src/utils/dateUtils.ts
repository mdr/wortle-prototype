export const formatDate = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate + "T00:00:00")
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

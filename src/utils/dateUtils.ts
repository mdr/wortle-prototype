export const formatDate = (isoDate: string, locale?: string): string => {
  const date = new Date(isoDate + "T00:00:00")
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatDuration = (from: Date, to: Date): string => {
  const diff = to.getTime() - from.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

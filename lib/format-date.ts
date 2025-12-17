export function formatDate(isoDate: string): string {
  const date = new Date(isoDate + "T00:00:00")
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

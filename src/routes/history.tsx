import { createFileRoute } from "@tanstack/react-router"
import { HistoryPage } from "@/components/history/HistoryPage"
import { StatsStorage } from "@/lib/StatsStorage"

const HistoryRouteComponent = () => {
  const storage = new StatsStorage(window.localStorage)
  return <HistoryPage storage={storage} />
}

export const Route = createFileRoute("/history")({
  component: HistoryRouteComponent,
})

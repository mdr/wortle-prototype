import { createFileRoute } from "@tanstack/react-router"

import { HistoryPage } from "@/components/history/HistoryPage"
import { useStatsStorage } from "@/lib/GlobalDependencies"

const HistoryRouteComponent = () => {
  const statsStorage = useStatsStorage()
  return <HistoryPage storage={statsStorage} />
}

export const Route = createFileRoute("/history")({
  component: HistoryRouteComponent,
})

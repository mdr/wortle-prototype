import { createRouter, createMemoryHistory } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"
import { App } from "@/components/App"

export const TestApp = ({ initialPath = "/" }: { initialPath?: string }) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })
  return <App router={router} />
}

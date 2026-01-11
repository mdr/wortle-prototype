import { createMemoryHistory, createRouter } from "@tanstack/react-router"

import { App } from "@/components/App"
import { type GlobalDependencies } from "@/lib/GlobalDependencies"
import { routeTree } from "@/routeTree.gen"

interface TestAppProps {
  initialPath?: string
  dependencies?: GlobalDependencies
}

export const TestApp = ({ initialPath = "/", dependencies }: TestAppProps) => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  })
  return <App router={router} dependencies={dependencies} />
}

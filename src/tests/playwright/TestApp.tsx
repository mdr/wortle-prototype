import { createRouter, createMemoryHistory } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"
import { App } from "@/components/App"
import { type GlobalDependencies } from "@/lib/GlobalDependencies"

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

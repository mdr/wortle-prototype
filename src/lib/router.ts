import { createMemoryHistory, createRouter } from "@tanstack/react-router"

import { type Clock } from "@/lib/Clock"
import { type GlobalDependencies } from "@/lib/GlobalDependencies"
import { routeTree } from "@/routeTree.gen"

export interface RouterContext {
  clock: Clock
}

export const createAppRouter = (dependencies: GlobalDependencies, initialPath?: string) =>
  createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
    context: { clock: dependencies.clock },
    history: initialPath ? createMemoryHistory({ initialEntries: [initialPath] }) : undefined,
  })

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}

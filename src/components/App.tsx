import { createRouter, Router, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"

import { defaultClock } from "@/lib/Clock"
import { type GlobalDependencies } from "@/lib/GlobalDependencies"
import { GlobalDependenciesProvider } from "@/lib/GlobalDependenciesProvider"
import { routeTree } from "@/routeTree.gen"

const defaultRouter = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  scrollRestoration: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof defaultRouter
  }
}

const defaultDependencies: GlobalDependencies = {
  clock: defaultClock,
}

export interface AppProps {
  router?: Router<typeof routeTree>
  dependencies?: GlobalDependencies
}

export const App = ({ router = defaultRouter, dependencies = defaultDependencies }: AppProps) => (
  <StrictMode>
    <GlobalDependenciesProvider dependencies={dependencies}>
      <RouterProvider router={router} />
    </GlobalDependenciesProvider>
  </StrictMode>
)

import UmamiAnalytics from "@danielgtmn/umami-react"
import { createRouter, Router, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"

import { defaultClock } from "@/lib/Clock"
import { type GlobalDependencies } from "@/lib/GlobalDependencies"
import { GlobalDependenciesProvider } from "@/lib/GlobalDependenciesProvider"
import { StatsStorage } from "@/lib/StatsStorage"
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
  statsStorage: new StatsStorage(window.localStorage),
}

export interface AppProps {
  router?: Router<typeof routeTree>
  dependencies?: GlobalDependencies
}

export const App = ({ router = defaultRouter, dependencies = defaultDependencies }: AppProps) => (
  <StrictMode>
    {import.meta.env.PROD && (
      <UmamiAnalytics url="https://cloud.umami.is" websiteId="e9196c98-109f-4188-b531-40b430369c15" />
    )}
    <GlobalDependenciesProvider dependencies={dependencies}>
      <RouterProvider router={router} />
    </GlobalDependenciesProvider>
  </StrictMode>
)

import UmamiAnalytics from "@danielgtmn/umami-react"
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode, useMemo } from "react"

import { defaultClock } from "@/lib/Clock"
import { GlobalDependenciesProvider } from "@/lib/GlobalDependenciesProvider"
import { StatsStorage } from "@/lib/StatsStorage"
import { TestHooksProvider } from "@/lib/TestHooks"
import { routeTree } from "@/routeTree.gen"

const createAppRouter = (initialPath?: string) =>
  createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
    history: initialPath ? createMemoryHistory({ initialEntries: [initialPath] }) : undefined,
  })

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}

const defaultDependencies = {
  clock: defaultClock,
  statsStorage: new StatsStorage(window.localStorage),
}

export interface AppProps {
  initialPath?: string
}

export const App = ({ initialPath }: AppProps) => {
  const router = useMemo(() => createAppRouter(initialPath), [initialPath])
  return (
    <StrictMode>
      {import.meta.env.PROD && (
        <UmamiAnalytics url="https://cloud.umami.is" websiteId="e9196c98-109f-4188-b531-40b430369c15" />
      )}
      <GlobalDependenciesProvider dependencies={defaultDependencies}>
        <TestHooksProvider>
          <RouterProvider router={router} />
        </TestHooksProvider>
      </GlobalDependenciesProvider>
    </StrictMode>
  )
}

import UmamiAnalytics from "@danielgtmn/umami-react"
import { RouterProvider } from "@tanstack/react-router"
import { StrictMode, useMemo } from "react"

import { defaultGlobalDependencies } from "@/lib/GlobalDependencies"
import { GlobalDependenciesProvider } from "@/lib/GlobalDependenciesProvider"
import { createAppRouter } from "@/lib/router"
import { TestHooksProvider } from "@/lib/TestHooks"

export interface AppProps {
  initialPath?: string
}

export const App = ({ initialPath }: AppProps) => {
  const router = useMemo(() => createAppRouter(defaultGlobalDependencies, initialPath), [initialPath])
  return (
    <StrictMode>
      {import.meta.env.PROD && (
        <UmamiAnalytics url="https://cloud.umami.is" websiteId="e9196c98-109f-4188-b531-40b430369c15" />
      )}
      <GlobalDependenciesProvider dependencies={defaultGlobalDependencies}>
        <TestHooksProvider>
          <RouterProvider router={router} />
        </TestHooksProvider>
      </GlobalDependenciesProvider>
    </StrictMode>
  )
}

import { StrictMode } from "react"
import { RouterProvider, createRouter, Router } from "@tanstack/react-router"
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

export interface AppProps {
  router?: Router<typeof routeTree>
}

export const App = ({ router = defaultRouter }: AppProps) => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

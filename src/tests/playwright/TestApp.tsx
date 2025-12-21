import { StrictMode } from "react"
import { RouterProvider, createRouter, createMemoryHistory } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"

export type TestAppProps = {
  initialPath?: string
}

export const TestApp = ({ initialPath = "/" }: TestAppProps) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: [initialPath],
  })

  const router = createRouter({
    routeTree,
    history: memoryHistory,
  })

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

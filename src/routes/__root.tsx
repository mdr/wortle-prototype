import { createRootRoute, Outlet } from "@tanstack/react-router"

import { ErrorFallback } from "@/components/ErrorFallback"
import { NotFoundPage } from "@/components/NotFoundPage"

export const Route = createRootRoute({
  component: () => (
    <div className="font-sans antialiased">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => <ErrorFallback error={error} />,
})

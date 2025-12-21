import { createRootRoute, Outlet } from "@tanstack/react-router"
import { NotFoundPage } from "@/components/NotFoundPage"
import { ErrorFallback } from "@/components/ErrorFallback"

export const Route = createRootRoute({
  component: () => (
    <div className="font-sans antialiased">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => <ErrorFallback error={error} />,
})

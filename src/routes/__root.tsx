import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"

import { ErrorFallback } from "@/components/ErrorFallback"
import { NotFoundPage } from "@/components/NotFoundPage"
import { type RouterContext } from "@/lib/router"

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="font-sans antialiased">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => <ErrorFallback error={error} />,
})

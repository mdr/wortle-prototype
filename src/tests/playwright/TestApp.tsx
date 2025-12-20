import { ReactNode } from "react"

interface TestAppProps {
  children: ReactNode
}

// Simple wrapper for testing - styles are imported via playwright/index.tsx
export const TestApp = ({ children }: TestAppProps) => {
  return <div className="font-sans antialiased">{children}</div>
}

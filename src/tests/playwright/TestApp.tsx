import { App } from "@/components/App"

interface TestAppProps {
  initialPath?: string
}

export const TestApp = ({ initialPath = "/" }: TestAppProps) => <App initialPath={initialPath} />

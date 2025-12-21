import { Link } from "@tanstack/react-router"
import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { AlertTriangle, Home } from "lucide-react"
import { assetUrl } from "@/utils/utils"
import { ErrorTestIds } from "./ErrorTestIds"

export type ErrorFallbackProps = {
  error: Error
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <main className="min-h-screen bg-background" data-testid={ErrorTestIds.page}>
      <header className="min-w-[334px] border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex flex-shrink-0 items-center gap-3">
              <img src={assetUrl("/logo.png")} alt="" className="size-12 min-[440px]:size-20" />
              <div>
                <h1 className="font-serif text-xl font-bold text-foreground min-[440px]:text-2xl">Wortle</h1>
                <p className="hidden text-sm text-muted-foreground min-[440px]:block">Daily Wild Plant Quiz</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <AlertTriangle className="size-16 text-destructive" />
          </div>
          <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">Something Went Wrong</h2>
          <p className="mb-4 text-muted-foreground">An unexpected error occurred. Please try again.</p>
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Technical details
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-xs text-muted-foreground">{error.message}</pre>
          </details>
          <Link to="/">
            <Button>
              <Home className="size-4" />
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  )
}

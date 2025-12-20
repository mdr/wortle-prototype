import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { HelpCircle } from "lucide-react"
import { getAllPuzzleIds } from "@/lib/puzzles"

// Test component that mirrors the home page structure without router
export const TestHomePage = () => {
  const puzzleIds = getAllPuzzleIds()

  return (
    <main className="min-h-screen bg-background" data-testid="home-page">
      <header className="min-w-[334px] border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center gap-3">
              <img src="/logo.png" alt="" className="size-12 min-[440px]:size-20" />
              <div>
                <h1 className="font-serif text-xl font-bold text-foreground min-[440px]:text-2xl">Wortle</h1>
                <p className="hidden text-sm text-muted-foreground min-[440px]:block">Daily Wild Plant Quiz</p>
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-4">
              <a
                href="/about"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <HelpCircle className="size-5" />
                <span className="sr-only">About Wortle</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Welcome to the Wortle prototype!</h2>
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Try the prototype</h2>
            <div className="flex flex-col gap-3">
              {puzzleIds.map((id) => (
                <a key={id} href={`/puzzle/${id}`} data-testid="puzzle-link">
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    Puzzle #{id}
                  </Button>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

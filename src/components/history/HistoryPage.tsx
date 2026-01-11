import { Link } from "@tanstack/react-router"
import { useMemo } from "react"
import { Card } from "@/components/shadcn/Card"
import { Button } from "@/components/shadcn/Button"
import { ArrowLeft, Calendar, TrendingUp, Award, Flame } from "lucide-react"
import { type StatsStorage } from "@/lib/StatsStorage"
import { deriveDailySummary } from "@/lib/dailyStatsSummary"
import { assetUrl } from "@/utils/utils"
import { HistoryTestIds } from "./HistoryTestIds"
import { HistoryItem } from "./HistoryItem"

interface HistoryPageProps {
  storage: StatsStorage
}

export const HistoryPage = ({ storage }: HistoryPageProps) => {
  const stats = useMemo(() => storage.load(), [storage])
  const summary = useMemo(() => deriveDailySummary(stats.history), [stats.history])
  const sortedHistory = useMemo(() => [...stats.history].sort((a, b) => b.date.localeCompare(a.date)), [stats.history])
  const accuracy = Math.round(summary.winRate * 100)

  return (
    <main className="min-h-screen bg-background" data-testid={HistoryTestIds.page}>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 size-4" />
          Back to quiz
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <img src={assetUrl("/logo.png")} alt="" className="size-20" />
          <h1 className="text-3xl font-bold">Your History</h1>
        </div>

        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Statistics</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted p-3">
                <div className="mb-1 flex items-center gap-2">
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-xs text-foreground/70">Total</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {summary.played} <span className="text-sm font-normal text-foreground/70">quizzes played</span>
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Award className="size-4 text-primary" />
                  <span className="text-xs text-foreground/70">Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {accuracy}% <span className="text-sm font-normal text-foreground/70">correct</span>
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Flame className="size-4 text-orange-500" />
                  <span className="text-xs text-foreground/70">Streak</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {summary.currentStreak} <span className="text-sm font-normal text-foreground/70">in a row</span>
                </p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="mb-1 flex items-center gap-2">
                  <Award className="size-4 text-amber-500" />
                  <span className="text-xs text-foreground/70">Max Streak</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {summary.maxStreak} <span className="text-sm font-normal text-foreground/70">in a row</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="mb-3 font-serif text-lg font-semibold text-foreground">Recent Puzzles</h2>
            {sortedHistory.length === 0 ? (
              <div className="py-8 text-center" data-testid={HistoryTestIds.emptyState}>
                <Calendar className="mx-auto mb-4 size-12 text-muted-foreground" />
                <p className="mb-4 text-muted-foreground">You haven't completed any puzzles yet.</p>
                <Link to="/daily">
                  <Button>Play today's puzzle</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedHistory.map((record) => (
                  <HistoryItem key={record.date} record={record} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </main>
  )
}

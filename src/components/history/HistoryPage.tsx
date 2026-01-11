import { Link } from "@tanstack/react-router"
import { ArrowLeft, Award, Calendar, Flame, TrendingUp } from "lucide-react"
import { useMemo } from "react"

import { Button } from "@/components/shadcn/Button"
import { Card } from "@/components/shadcn/Card"
import { deriveDailySummary } from "@/lib/dailyStatsSummary"
import { type StatsStorage } from "@/lib/StatsStorage"
import { assetUrl } from "@/utils/utils"

import { HistoryItem } from "./HistoryItem"
import { HistoryTestIds } from "./HistoryTestIds"

interface HistoryPageProps {
  storage: StatsStorage
}

export const HistoryPage = ({ storage }: HistoryPageProps) => {
  const stats = useMemo(() => storage.load(), [storage])
  const summary = useMemo(() => deriveDailySummary(stats.history), [stats.history])
  const sortedHistory = useMemo(() => [...stats.history].sort((a, b) => b.date.localeCompare(a.date)), [stats.history])
  const accuracy = Math.round(summary.winRate * 100)

  return (
    <main className="bg-background min-h-screen" data-testid={HistoryTestIds.page}>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Link to="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm">
          <ArrowLeft className="mr-1 size-4" />
          Back to quiz
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <img src={assetUrl("/logo.png")} alt="" className="size-20" />
          <h1 className="text-3xl font-bold">Your History</h1>
        </div>

        <div className="space-y-6">
          {sortedHistory.length > 0 && (
            <Card className="p-4" data-testid={HistoryTestIds.stats}>
              <h2 className="text-foreground mb-3 font-serif text-lg font-semibold">Statistics</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <TrendingUp className="text-primary size-4" />
                    <span className="text-foreground/70 text-xs">Total</span>
                  </div>
                  <p className="text-foreground text-2xl font-bold">
                    {summary.played} <span className="text-foreground/70 text-sm font-normal">quizzes played</span>
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Award className="text-primary size-4" />
                    <span className="text-foreground/70 text-xs">Accuracy</span>
                  </div>
                  <p className="text-foreground text-2xl font-bold">
                    {accuracy}% <span className="text-foreground/70 text-sm font-normal">correct</span>
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Flame className="size-4 text-orange-500" />
                    <span className="text-foreground/70 text-xs">Streak</span>
                  </div>
                  <p className="text-foreground text-2xl font-bold">
                    {summary.currentStreak} <span className="text-foreground/70 text-sm font-normal">in a row</span>
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Award className="size-4 text-amber-500" />
                    <span className="text-foreground/70 text-xs">Max Streak</span>
                  </div>
                  <p className="text-foreground text-2xl font-bold">
                    {summary.maxStreak} <span className="text-foreground/70 text-sm font-normal">in a row</span>
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h2 className="text-foreground mb-3 font-serif text-lg font-semibold">Recent Puzzles</h2>
            {sortedHistory.length === 0 ? (
              <div className="py-8 text-center" data-testid={HistoryTestIds.emptyState}>
                <Calendar className="text-muted-foreground mx-auto mb-4 size-12" />
                <p className="text-muted-foreground mb-4">You haven't completed any puzzles yet.</p>
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

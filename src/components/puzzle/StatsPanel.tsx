import { Link } from "@tanstack/react-router"
import { Award, Clock as ClockIcon, Flame, History, Share2, TrendingUp } from "lucide-react"

import { Button } from "@/components/shadcn/Button"
import { Card } from "@/components/shadcn/Card"
import { type Clock } from "@/lib/Clock"
import { DailyStatsSummary } from "@/lib/dailyStatsSummary"
import { useClock } from "@/lib/GlobalDependencies"
import { formatDuration } from "@/utils/dateUtils"

interface StatsPanelProps {
  summary: DailyStatsSummary
}

const getTimeToNextWortle = (clock: Clock): string => {
  const now = clock.now()
  const tomorrow = new Date(now)
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
  tomorrow.setUTCHours(0, 0, 0, 0)
  return formatDuration(now, tomorrow)
}

export const StatsPanel = ({ summary }: StatsPanelProps) => {
  const clock = useClock()
  const accuracy = Math.round(summary.winRate * 100)

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-serif text-lg font-semibold text-foreground">Your Statistics</h3>
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

      <div className="mt-4 space-y-3 border-t pt-4">
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">Next Wortle</span>
          </div>
          <span className="text-sm font-bold text-foreground">{getTimeToNextWortle(clock)}</span>
        </div>

        <Button onClick={() => {}} variant="outline" className="w-full bg-transparent" size="sm">
          <Share2 className="mr-2 size-4" />
          Share Result
        </Button>

        <Button asChild variant="outline" className="w-full bg-transparent" size="sm">
          <Link to="/history">
            <History className="mr-2 size-4" />
            View History
          </Link>
        </Button>
      </div>
    </Card>
  )
}

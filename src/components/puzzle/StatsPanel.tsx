import { Link } from "@tanstack/react-router"
import { Award, Clock as ClockIcon, Flame, History, TrendingUp } from "lucide-react"

import { ShareResultButton } from "@/components/puzzle/ShareResultButton"
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
      <h3 className="text-foreground mb-3 font-serif text-lg font-semibold">Your Statistics</h3>
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

      <div className="mt-4 space-y-3 border-t pt-4">
        <div className="bg-muted flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="text-foreground size-4" />
            <span className="text-foreground text-sm font-medium">Next Wortle</span>
          </div>
          <span className="text-foreground text-sm font-bold">{getTimeToNextWortle(clock)}</span>
        </div>

        <ShareResultButton />

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

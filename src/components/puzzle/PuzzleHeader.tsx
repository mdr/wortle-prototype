import { Link } from "@tanstack/react-router"
import { HeaderNav } from "@/components/shared/HeaderNav"
import { Puzzle } from "@/lib/Puzzle"
import { findFirstDateForPuzzle } from "@/lib/schedule"
import { formatDate } from "@/utils/dateUtils"
import { assetUrl } from "@/utils/utils"
import { Iso8601Date } from "@/utils/brandedTypes"
import { PuzzleTestIds } from "./PuzzleTestIds"

interface PuzzleHeaderProps {
  puzzle: Puzzle
  scheduledDate?: Iso8601Date
}

export const PuzzleHeader = ({ puzzle, scheduledDate }: PuzzleHeaderProps) => {
  const displayDate = scheduledDate ?? findFirstDateForPuzzle(puzzle.id)

  return (
    <header className="min-w-[334px] border-b border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center gap-3" data-testid={PuzzleTestIds.homeLink}>
            <img src={assetUrl("/logo.png")} alt="" className="size-12 min-[520px]:size-20" />
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground min-[520px]:text-2xl">Wortle</h1>
              <p className="hidden text-sm text-muted-foreground min-[520px]:block">Daily Wild Plant Quiz</p>
            </div>
          </Link>
          <div className="flex flex-shrink-0 items-center gap-4">
            <div className="text-right">
              {displayDate && (
                <p className="whitespace-nowrap text-sm font-medium text-foreground">{formatDate(displayDate)}</p>
              )}
              <p className="text-xs text-muted-foreground">Puzzle #{puzzle.id}</p>
            </div>
            <HeaderNav />
          </div>
        </div>
      </div>
    </header>
  )
}

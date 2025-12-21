import { Card } from "@/components/shadcn/Card"
import { UkLocationMap } from "@/components/puzzle/UkLocationMap"
import { Puzzle } from "@/lib/Puzzle"
import { formatDate } from "@/utils/dateUtils"
import { ClassNameList } from "@/utils/brandedTypes"

type WhereAndWhenCardProps = {
  puzzleData: Puzzle
}

export const WhereAndWhenCard = ({ puzzleData }: WhereAndWhenCardProps) => (
  <Card className="p-4">
    <h2 className="mb-1 font-serif text-2xl font-bold text-foreground">Where and when</h2>
    <div className="flex gap-4">
      <UkLocationMap
        latitude={puzzleData.coordinates.lat}
        longitude={puzzleData.coordinates.lng}
        className={ClassNameList("h-40 w-30 flex-shrink-0 rounded border border-border")}
      />
      <div className="space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="font-medium text-muted-foreground">Location:</span>
          <span className="text-foreground">{puzzleData.location}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium text-muted-foreground">Habitat:</span>
          <span className="text-foreground">{puzzleData.habitat}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium text-muted-foreground">Date:</span>
          <span className="text-foreground">{formatDate(puzzleData.observationDate)}</span>
        </div>
      </div>
    </div>
  </Card>
)

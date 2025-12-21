import { Card } from "@/components/shadcn/Card"
import { UkLocationMap } from "@/components/puzzle/UkLocationMap"
import { Puzzle } from "@/lib/Puzzle"
import { formatDate } from "@/utils/dateUtils"
import { ClassNameList } from "@/utils/brandedTypes"

type WhereAndWhenCardProps = {
  puzzle: Puzzle
}

export const WhereAndWhenCard = ({ puzzle }: WhereAndWhenCardProps) => {
  const { location, habitat, observationDate } = puzzle
  const { description, coordinates } = location

  return (
    <Card className="p-4">
      <h2 className="mb-1 font-serif text-2xl font-bold text-foreground">Where and when</h2>
      <div className="flex gap-4">
        <UkLocationMap
          coordinates={coordinates}
          className={ClassNameList("h-40 w-30 flex-shrink-0 rounded border border-border")}
        />
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="font-medium text-muted-foreground">Location:</span>
            <span className="text-foreground">{description}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-muted-foreground">Habitat:</span>
            <span className="text-foreground">{habitat}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-muted-foreground">Date:</span>
            <span className="text-foreground">{formatDate(observationDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

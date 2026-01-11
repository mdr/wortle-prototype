import { UkLocationMap } from "@/components/puzzle/UkLocationMap"
import { Card } from "@/components/shadcn/Card"
import { Puzzle } from "@/lib/Puzzle"
import { ClassNameList } from "@/utils/brandedTypes"
import { formatDate } from "@/utils/dateUtils"

interface WhereAndWhenCardProps {
  puzzle: Puzzle
}

export const WhereAndWhenCard = ({ puzzle }: WhereAndWhenCardProps) => {
  const { location, habitat, observationDate } = puzzle
  const { description, coordinates } = location

  return (
    <Card className="p-4">
      <h2 className="text-foreground mb-1 font-serif text-2xl font-bold">Context</h2>
      <div className="flex gap-4">
        <UkLocationMap
          coordinates={coordinates}
          className={ClassNameList("border-border h-40 w-30 flex-shrink-0 rounded border")}
        />
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground font-medium">Location:</span>
            <span className="text-foreground">{description}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground font-medium">Habitat:</span>
            <span className="text-foreground">{habitat}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground font-medium">Date:</span>
            <span className="text-foreground">{formatDate(observationDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

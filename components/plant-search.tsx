"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

const PLANT_DATABASE = [
  { name: "Devil's-bit Scabious", scientific: "Succisa pratensis" },
  { name: "Field Scabious", scientific: "Knautia arvensis" },
  { name: "Small Scabious", scientific: "Scabiosa columbaria" },
  { name: "Bluebell", scientific: "Hyacinthoides non-scripta" },
  { name: "Harebell", scientific: "Campanula rotundifolia" },
  { name: "Common Knapweed", scientific: "Centaurea nigra" },
  { name: "Sheep's-bit", scientific: "Jasione montana" },
  { name: "Meadow Buttercup", scientific: "Ranunculus acris" },
  { name: "Bird's-foot Trefoil", scientific: "Lotus corniculatus" },
]

interface PlantSearchProps {
  onSelect: (plant: { name: string; scientific: string } | null) => void
  selectedPlant: { name: string; scientific: string } | null
}

export function PlantSearch({ onSelect, selectedPlant }: PlantSearchProps) {
  const [query, setQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<typeof PLANT_DATABASE>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      const results = PLANT_DATABASE.filter(
        (plant) =>
          plant.name.toLowerCase().includes(query.toLowerCase()) ||
          plant.scientific.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredResults(results)
      setShowResults(true)
    } else {
      setFilteredResults([])
      setShowResults(false)
    }
  }, [query])

  const handleSelect = (plant: (typeof PLANT_DATABASE)[0]) => {
    onSelect(plant)
    setQuery("")
    setShowResults(false)
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Enter plant name</label>
        <Input
          type="text"
          placeholder="Type common or scientific name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {showResults && filteredResults.length > 0 && (
        <Command className="rounded-lg border shadow-md">
          <CommandList>
            <CommandGroup heading="Suggestions">
              {filteredResults.map((plant, index) => (
                <CommandItem key={index} onSelect={() => handleSelect(plant)} className="group">
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium">{plant.name}</span>
                    <span className="text-xs italic text-muted-foreground group-data-[selected=true]:text-primary-foreground/70">{plant.scientific}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}

      {showResults && filteredResults.length === 0 && (
        <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
          No plants found. Try a different name.
        </div>
      )}

      {selectedPlant && (
        <div className="rounded-lg border border-border bg-muted p-3">
          <div className="flex-1">
            <p className="font-medium text-foreground">{selectedPlant.name}</p>
            <p className="text-xs italic text-muted-foreground">{selectedPlant.scientific}</p>
          </div>
        </div>
      )}
    </div>
  )
}

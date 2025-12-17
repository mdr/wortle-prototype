"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

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
  const [open, setOpen] = useState(false)

  const handleSelect = (plant: (typeof PLANT_DATABASE)[0]) => {
    onSelect(plant)
    setQuery("")
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Enter plant name</label>
        <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          placeholder="Type common or scientific name..."
          value={query}
          onValueChange={(value) => {
            setQuery(value)
            setOpen(value.length > 0)
          }}
          onFocus={() => query.length > 0 && setOpen(true)}
        />
        {open && (
          <CommandList>
            <CommandEmpty>No plants found. Try a different name.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {PLANT_DATABASE.filter(
                (plant) =>
                  plant.name.toLowerCase().includes(query.toLowerCase()) ||
                  plant.scientific.toLowerCase().includes(query.toLowerCase()),
              ).map((plant) => (
                <CommandItem
                  key={plant.scientific}
                  value={plant.name}
                  onSelect={() => handleSelect(plant)}
                  className="group"
                >
                  <div className="flex flex-1 flex-col">
                    <span className="font-medium">{plant.name}</span>
                    <span className="text-xs italic text-muted-foreground group-data-[selected=true]:text-primary-foreground/70">
                      {plant.scientific}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
      </div>

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

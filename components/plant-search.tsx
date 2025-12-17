"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { getAllPlants, Plant } from "@/lib/plants"

interface PlantSearchProps {
  onSelect: (plant: Plant | null) => void
  selectedPlant: Plant | null
}

export function PlantSearch({ onSelect, selectedPlant }: PlantSearchProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const allPlants = getAllPlants()

  const handleSelect = (plant: Plant) => {
    onSelect(plant)
    setQuery("")
    setOpen(false)
  }

  const filteredPlants = allPlants.filter(
    (plant) =>
      plant.commonNames.some((name) => name.toLowerCase().includes(query.toLowerCase())) ||
      plant.scientificName.toLowerCase().includes(query.toLowerCase()),
  )

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
                {filteredPlants.map((plant) => (
                  <CommandItem
                    key={plant.id}
                    value={plant.commonNames[0]}
                    onSelect={() => handleSelect(plant)}
                    className="group"
                  >
                    <div className="flex flex-1 flex-col">
                      <span className="font-medium">{plant.commonNames[0]}</span>
                      <span className="text-xs italic text-muted-foreground group-data-[selected=true]:text-primary-foreground/70">
                        {plant.scientificName}
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
            <p className="font-medium text-foreground">{selectedPlant.commonNames[0]}</p>
            <p className="text-xs italic text-muted-foreground">{selectedPlant.scientificName}</p>
          </div>
        </div>
      )}
    </div>
  )
}

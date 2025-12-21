import { useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/Command"
import { getAllSpecies, Species } from "@/lib/plants"

interface PlantSearchProps {
  onSelect: (species: Species | undefined) => void
  selectedSpecies: Species | undefined
}

export const PlantSearch = ({ onSelect, selectedSpecies }: PlantSearchProps) => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const allSpecies = getAllSpecies()

  const handleSelect = (species: Species) => {
    onSelect(species)
    setQuery("")
    setOpen(false)
  }

  const filteredSpecies = allSpecies.filter(
    (s) =>
      s.commonNames.some((name) => name.toLowerCase().includes(query.toLowerCase())) ||
      s.scientificName.toLowerCase().includes(query.toLowerCase()),
  )

  const handleClear = () => {
    onSelect(undefined)
    setQuery("")
  }

  if (selectedSpecies) {
    return (
      <div className="space-y-2">
        <div className="flex items-end justify-between rounded-lg border border-border bg-muted p-3">
          <div>
            <p className="font-medium text-foreground">{selectedSpecies.commonNames[0]}</p>
            <p className="text-xs italic text-foreground/70">{selectedSpecies.scientificName}</p>
          </div>
          <p className="text-xs text-foreground/70">{selectedSpecies.family}</p>
        </div>
        <button type="button" onClick={handleClear} className="text-sm text-primary underline-offset-4 hover:underline">
          Choose a different plant
        </button>
      </div>
    )
  }

  return (
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
          data-testid="plant-search-input"
        />
        <CommandList className={open ? "" : "hidden"}>
          <CommandEmpty>No plants found. Try a different name.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filteredSpecies.map((s) => (
              <CommandItem
                key={s.id}
                value={s.commonNames[0]}
                onSelect={() => handleSelect(s)}
                className="group"
                data-testid="plant-option"
              >
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">{s.commonNames[0]}</span>
                  <span className="text-xs italic text-muted-foreground group-data-[selected=true]:text-primary-foreground/70">
                    {s.scientificName}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

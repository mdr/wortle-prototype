import { useEffect, useRef, useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/Command"
import { getAllSpecies } from "@/lib/plants"
import { Species, SpeciesId } from "@/lib/Species"
import { PuzzleTestIds } from "./PuzzleTestIds"

interface PlantSearchProps {
  onSelect: (species: Species | undefined) => void
  selectedSpecies: Species | undefined
  excludedSpeciesIds?: SpeciesId[]
}

export const PlantSearch = ({ onSelect, selectedSpecies, excludedSpeciesIds = [] }: PlantSearchProps) => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const { containerRef, handleFocus, handleBlur } = useScrollToLabelOnFocus(open)
  const inputId = "plant-search-input"

  const allSpecies = getAllSpecies()

  const handleSelect = (species: Species) => {
    onSelect(species)
    setQuery("")
    setOpen(false)
  }

  const filteredSpecies = allSpecies.filter(
    (s) =>
      !excludedSpeciesIds.includes(s.id) &&
      (s.commonNames.some((name) => name.toLowerCase().includes(query.toLowerCase())) ||
        s.scientificName.toLowerCase().includes(query.toLowerCase())),
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
    <div ref={containerRef}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-foreground">
        Enter plant name
      </label>
      <Command className="rounded-lg border shadow-md" shouldFilter={false}>
        <CommandInput
          id={inputId}
          placeholder="Type common or scientific name..."
          value={query}
          onValueChange={(value) => {
            setQuery(value)
            setOpen(value.length > 0)
          }}
          onFocus={() => {
            handleFocus()
            if (query.length > 0) setOpen(true)
          }}
          onBlur={() => {
            handleBlur()
          }}
          data-testid={PuzzleTestIds.searchInput}
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
                data-testid={PuzzleTestIds.plantOption}
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

// Keep the input and suggestions visible above mobile keyboards.
const useScrollToLabelOnFocus = (open: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const hasInteractedRef = useRef(false)

  const scrollToLabelIfMobile = () => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    if (!isCoarsePointer) return
    containerRef.current?.scrollIntoView({ block: "start" })
  }

  useEffect(() => {
    if (!open) return
    if (!hasInteractedRef.current) return
    scrollToLabelIfMobile()
  }, [open])

  useEffect(() => {
    if (!isFocused) return undefined
    if (!hasInteractedRef.current) return undefined

    const viewport = window.visualViewport
    const handleResize = () => {
      scrollToLabelIfMobile()
    }

    viewport?.addEventListener("resize", handleResize)

    return () => {
      viewport?.removeEventListener("resize", handleResize)
    }
  }, [isFocused])

  const handleFocus = () => {
    hasInteractedRef.current = true
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return { containerRef, handleFocus, handleBlur }
}

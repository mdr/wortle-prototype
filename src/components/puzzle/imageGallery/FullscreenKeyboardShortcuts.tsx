import { useEffect } from "react"
import { useControls } from "react-zoom-pan-pinch"
import { usePuzzleServiceActions } from "@/services/puzzle/puzzleServiceHooks"

export const useFullscreenKeyboardShortcuts = (): void => {
  const puzzleActions = usePuzzleServiceActions()
  const { zoomIn, zoomOut, resetTransform } = useControls()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        puzzleActions.exitFullscreenImageMode()
      } else if (event.key === "ArrowLeft") {
        puzzleActions.goToPreviousImage()
      } else if (event.key === "ArrowRight") {
        puzzleActions.goToNextImage()
      } else if (event.key === "+" || event.key === "=") {
        zoomIn()
      } else if (event.key === "-" || event.key === "_") {
        zoomOut()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      resetTransform()
    }
  }, [puzzleActions, resetTransform, zoomIn, zoomOut])
}

export const FullscreenKeyboardShortcuts = () => {
  useFullscreenKeyboardShortcuts()
  return null
}

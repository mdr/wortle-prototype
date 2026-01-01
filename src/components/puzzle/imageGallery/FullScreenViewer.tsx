import { useCallback, useEffect } from "react"
import { FocusTrap } from "focus-trap-react"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/shadcn/Button"
import { assetUrl } from "@/utils/utils"
import { ZoomControls } from "./ZoomControls"
import { FullscreenTestIds } from "./GalleryTestIds"
import { usePuzzleServiceActions, usePuzzleState } from "@/services/puzzle/puzzleServiceHooks"

export const FullScreenViewer = () => {
  const { images, imageGalleryIndex } = usePuzzleState((state) => ({
    images: state.puzzle.images,
    imageGalleryIndex: state.imageGalleryIndex,
  }))
  const puzzleActions = usePuzzleServiceActions()
  const goToPrevious = useCallback(() => {
    puzzleActions.goToPreviousImage()
  }, [puzzleActions])

  const goToNext = useCallback(() => {
    puzzleActions.goToNextImage()
  }, [puzzleActions])

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: false, allowOutsideClick: true }}>
      <div
        className="fixed inset-0 z-50 bg-black"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        data-testid={FullscreenTestIds.viewer}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 size-12 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
          onClick={puzzleActions.exitFullscreenImageMode}
          data-testid={FullscreenTestIds.close}
        >
          <X className="size-6" />
          <span className="sr-only">Close</span>
        </Button>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
              onClick={goToPrevious}
              data-testid={FullscreenTestIds.prev}
            >
              <ChevronLeft className="size-8" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
              onClick={goToNext}
              data-testid={FullscreenTestIds.next}
            >
              <ChevronRight className="size-8" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}

        <TransformWrapper
          key={imageGalleryIndex}
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          centerOnInit
          limitToBounds
          centerZoomedOut
          doubleClick={{ mode: "toggle", step: 2 }}
        >
          <FullscreenKeyboardShortcuts />
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            <img
              src={assetUrl(images[imageGalleryIndex].url || "/placeholder.svg")}
              alt={images[imageGalleryIndex].caption}
              className="max-h-full max-w-full object-contain"
            />
          </TransformComponent>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <p className="rounded bg-black/50 px-3 py-1 text-sm text-white" data-testid={FullscreenTestIds.caption}>
              {images[imageGalleryIndex].caption}
            </p>
            <ZoomControls />
          </div>
        </TransformWrapper>
      </div>
    </FocusTrap>
  )
}

const useFullscreenKeyboardShortcuts = () => {
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

const FullscreenKeyboardShortcuts = () => {
  useFullscreenKeyboardShortcuts()
  return null
}

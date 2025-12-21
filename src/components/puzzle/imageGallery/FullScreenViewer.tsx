import { useEffect, useCallback } from "react"
import { FocusTrap } from "focus-trap-react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/shadcn/Button"
import { assetUrl } from "@/utils/utils"
import { ImageData } from "./types"
import { ZoomControls } from "./ZoomControls"
import { FullscreenTestIds } from "./GalleryTestIds"

type FullScreenViewerProps = {
  images: ImageData[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export const FullScreenViewer = ({ images, currentIndex, onClose, onNavigate }: FullScreenViewerProps) => {
  const goToPrevious = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }, [currentIndex, images.length, onNavigate])

  const goToNext = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, goToPrevious, goToNext])

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
          className="absolute right-4 top-4 z-10 size-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
          onClick={onClose}
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
          key={currentIndex}
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          centerOnInit
          doubleClick={{ mode: "toggle", step: 2 }}
        >
          <TransformComponent
            wrapperClass="!w-full !h-full"
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            <img
              src={assetUrl(images[currentIndex].url || "/placeholder.svg")}
              alt={images[currentIndex].caption}
              className="max-h-full max-w-full object-contain"
            />
          </TransformComponent>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
            <p className="rounded bg-black/50 px-3 py-1 text-sm text-white" data-testid={FullscreenTestIds.caption}>
              {images[currentIndex].caption}
            </p>
            <ZoomControls />
          </div>
        </TransformWrapper>
      </div>
    </FocusTrap>
  )
}

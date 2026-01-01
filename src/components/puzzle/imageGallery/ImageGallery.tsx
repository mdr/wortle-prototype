import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, Maximize2, Copyright } from "lucide-react"
import { Button } from "@/components/shadcn/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/Popover"
import { assetUrl } from "@/utils/utils"
import { FullScreenViewer } from "./FullScreenViewer"
import { GalleryTestIds } from "./GalleryTestIds"
import { usePuzzleServiceActions, usePuzzleState } from "@/services/puzzle/puzzleServiceHooks"

export const ImageGallery = () => {
  const { images, photoAttribution } = usePuzzleState((state) => state.puzzle)
  const { imageGalleryIndex, isFullscreenImageMode } = usePuzzleState((state) => state)
  const puzzleActions = usePuzzleServiceActions()

  const goToPrevious = () => {
    puzzleActions.goToPreviousImage()
  }

  const goToNext = () => {
    puzzleActions.goToNextImage()
  }

  return (
    <>
      <div className="space-y-4" data-testid={GalleryTestIds.gallery}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <TransformWrapper
            key={imageGalleryIndex}
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            limitToBounds
            centerZoomedOut
            doubleClick={{ mode: "toggle", step: 2 }}
          >
            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
              <img
                src={assetUrl(images[imageGalleryIndex].url || "/placeholder.svg")}
                alt={images[imageGalleryIndex].caption}
                className="h-full w-full object-contain"
              />
            </TransformComponent>
          </TransformWrapper>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="pointer-events-auto size-12 rounded-full shadow-lg"
              data-testid={GalleryTestIds.prev}
            >
              <ChevronLeft className="size-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="pointer-events-auto size-12 rounded-full shadow-lg"
              data-testid={GalleryTestIds.next}
            >
              <ChevronRight className="size-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>

          <Button
            variant="secondary"
            size="icon"
            onClick={puzzleActions.enterFullscreenImageMode}
            className="absolute right-2 top-2 size-12 rounded-full shadow-lg"
            data-testid={GalleryTestIds.fullscreen}
          >
            <Maximize2 className="size-6" />
            <span className="sr-only">View fullscreen</span>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 size-12 rounded-full shadow-lg opacity-70 hover:opacity-100"
              >
                <Copyright className="size-6" />
                <span className="sr-only">Photo attribution</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto text-xs" side="top" align="end">
              <p className="flex flex-wrap items-center gap-x-1">
                <span>© 2025 by {photoAttribution.photographer}, licensed under</span>
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:underline"
                >
                  {photoAttribution.license}
                  <img
                    src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                    alt=""
                    className="ml-1 inline-block h-4 w-4"
                  />
                  <img
                    src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                    alt=""
                    className="ml-0.5 inline-block h-4 w-4"
                  />
                </a>
              </p>
            </PopoverContent>
          </Popover>
        </div>

        <p className="text-center text-sm text-muted-foreground" data-testid={GalleryTestIds.caption}>
          {images[imageGalleryIndex].caption}
        </p>

        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => puzzleActions.selectImageIndex(index)}
                className={`relative aspect-square w-full overflow-hidden rounded-md border transition-all ${
                  index === imageGalleryIndex
                    ? "border-muted-foreground/30"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-muted-foreground/30"
                }`}
                data-testid={GalleryTestIds.thumbnail}
              >
                <img
                  src={assetUrl(image.url || "/placeholder.svg")}
                  alt={image.caption}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
              <div
                className={`mt-1 h-0 w-0 border-x-[6px] border-b-[8px] border-x-transparent border-b-primary transition-opacity ${
                  index === imageGalleryIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {isFullscreenImageMode && <FullScreenViewer />}
    </>
  )
}

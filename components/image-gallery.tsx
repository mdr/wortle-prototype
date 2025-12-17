"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch"
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Copyright } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ImageData {
  url: string
  caption: string
}

interface Attribution {
  photographer: string
  license: string
}

interface ImageGalleryProps {
  images: ImageData[]
  attribution?: Attribution
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function ImageGallery({ images, attribution }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <TransformWrapper
            key={currentIndex}
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit
            doubleClick={{ mode: "toggle", step: 2 }}
          >
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              <img
                src={basePath + (images[currentIndex].url || "/placeholder.svg")}
                alt={images[currentIndex].caption}
                className="h-full w-full object-contain"
              />
            </TransformComponent>
          </TransformWrapper>

          {/* Navigation Buttons */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
            <Button variant="secondary" size="icon" onClick={goToPrevious} className="pointer-events-auto size-10 rounded-full shadow-lg">
              <ChevronLeft className="size-5" />
            </Button>
            <Button variant="secondary" size="icon" onClick={goToNext} className="pointer-events-auto size-10 rounded-full shadow-lg">
              <ChevronRight className="size-5" />
            </Button>
          </div>

          {/* Fullscreen Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsZoomed(true)}
            className="absolute right-2 top-2 size-10 rounded-full shadow-lg"
          >
            <Maximize2 className="size-4" />
          </Button>

          {/* Attribution Button */}
          {attribution && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-2 right-2 size-10 rounded-full shadow-lg opacity-70 hover:opacity-100"
                >
                  <Copyright className="size-5" />
                  <span className="sr-only">Photo attribution</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto text-xs" side="top" align="end">
                <p className="flex flex-wrap items-center gap-x-1">
                  <span>© 2025 by {attribution.photographer}, licensed under</span>
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center hover:underline"
                  >
                    {attribution.license}
                    <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" className="ml-1 inline-block h-4 w-4" />
                    <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" className="ml-0.5 inline-block h-4 w-4" />
                  </a>
                </p>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Caption */}
        <p className="text-center text-sm text-muted-foreground">{images[currentIndex].caption}</p>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <Image src={image.url || "/placeholder.svg"} alt={image.caption} fill className="object-cover" />
            </button>
          ))}
        </div>

      </div>

      {/* Full-screen Zoom Viewer */}
      {isZoomed && (
        <FullScreenViewer
          images={images}
          currentIndex={currentIndex}
          onClose={() => setIsZoomed(false)}
          onNavigate={setCurrentIndex}
        />
      )}
    </>
  )
}

function ZoomControls() {
  const { zoomIn, zoomOut, resetTransform } = useControls()
  return (
    <div className="flex items-center gap-1 rounded-full bg-black/50 p-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-white hover:bg-black/70 hover:text-white"
        onClick={() => zoomOut()}
      >
        <ZoomOut className="size-4" />
        <span className="sr-only">Zoom out</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-white hover:bg-black/70 hover:text-white"
        onClick={() => resetTransform()}
      >
        <RotateCcw className="size-4" />
        <span className="sr-only">Reset zoom</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-white hover:bg-black/70 hover:text-white"
        onClick={() => zoomIn()}
      >
        <ZoomIn className="size-4" />
        <span className="sr-only">Zoom in</span>
      </Button>
    </div>
  )
}

interface FullScreenViewerProps {
  images: ImageData[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

function FullScreenViewer({ images, currentIndex, onClose, onNavigate }: FullScreenViewerProps) {
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
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10 size-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
        onClick={onClose}
      >
        <X className="size-6" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="size-8" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={goToNext}
          >
            <ChevronRight className="size-8" />
            <span className="sr-only">Next image</span>
          </Button>
        </>
      )}

      {/* Zoomable image */}
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
            src={basePath + (images[currentIndex].url || "/placeholder.svg")}
            alt={images[currentIndex].caption}
            className="max-h-full max-w-full object-contain"
          />
        </TransformComponent>

        {/* Bottom controls */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <p className="rounded bg-black/50 px-3 py-1 text-sm text-white">
            {images[currentIndex].caption}
          </p>
          <ZoomControls />
        </div>
      </TransformWrapper>
    </div>
  )
}

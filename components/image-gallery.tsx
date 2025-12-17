"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

interface ImageData {
  url: string
  caption: string
}

interface ImageGalleryProps {
  images: ImageData[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
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
          <Image
            src={images[currentIndex].url || "/placeholder.svg"}
            alt={images[currentIndex].caption}
            fill
            className="object-cover"
          />

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
            <Button variant="secondary" size="icon" onClick={goToPrevious} className="size-10 rounded-full shadow-lg">
              <ChevronLeft className="size-5" />
            </Button>
            <Button variant="secondary" size="icon" onClick={goToNext} className="size-10 rounded-full shadow-lg">
              <ChevronRight className="size-5" />
            </Button>
          </div>

          {/* Zoom Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsZoomed(true)}
            className="absolute right-2 top-2 size-10 rounded-full shadow-lg"
          >
            <Maximize2 className="size-4" />
          </Button>
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

      {/* Zoom Dialog */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] p-2 sm:p-4" showCloseButton={false} aria-describedby={undefined}>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm text-muted-foreground">{images[currentIndex].caption}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <div className="relative h-[80vh] overflow-hidden rounded-lg bg-muted">
            <Image
              src={images[currentIndex].url || "/placeholder.svg"}
              alt={images[currentIndex].caption}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

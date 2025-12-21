import { useControls } from "react-zoom-pan-pinch"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/shadcn/Button"

export const ZoomControls = () => {
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

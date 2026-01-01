import { useCallback, useRef } from "react"
import confetti from "canvas-confetti"
import { unawaited } from "@/utils/unawaited"

export const useCorrectAnswerConfetti = () => {
  const panelRef = useRef<HTMLDivElement>(null)

  const fireConfetti = useCallback(() => {
    const panel = panelRef.current
    if (!panel) {
      return
    }
    const rect = panel.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight
    const confettiPromise = confetti({ origin: { x, y } })
    if (confettiPromise) {
      unawaited(confettiPromise)
    }
  }, [])

  return { fireConfetti, panelRef }
}

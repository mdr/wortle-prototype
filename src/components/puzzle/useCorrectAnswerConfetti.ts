import { useCallback, useRef } from "react"
import confetti from "canvas-confetti"
import { unawaited } from "@/utils/unawaited"
import { assert } from "tsafe"

export const useCorrectAnswerConfetti = () => {
  const panelRef = useRef<HTMLDivElement>(null)

  const fireConfetti = useCallback(() => {
    // Wait a tick so the answer panel has rendered and can be measured.
    setTimeout(() => {
      const panel = panelRef.current
      assert(panel, "Answer panel ref is required to fire confetti.")
      const rect = panel.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight
      const confettiPromise = confetti({ origin: { x, y } })
      if (confettiPromise) {
        unawaited(confettiPromise)
      }
    }, 50)
  }, [])

  return { fireConfetti, panelRef }
}

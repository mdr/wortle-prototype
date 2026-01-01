import { createOptionalContext, useService, useServiceStateSelector } from "@/utils/providerish/serviceHooks"
import { MAX_ATTEMPTS, PuzzleService, PuzzleServiceState } from "./PuzzleService"

export const PuzzleServiceContext = createOptionalContext<PuzzleService>()

export const usePuzzleService = (): PuzzleService => useService(PuzzleServiceContext)

export const usePuzzleStateSelector = <Selected = PuzzleServiceState>(
  selector: (state: PuzzleServiceState) => Selected = (state) => state as Selected,
): Selected => useServiceStateSelector(PuzzleServiceContext, selector)

export const usePuzzleIsCorrect = (): boolean =>
  usePuzzleStateSelector((state) => state.attempts.some((attempt) => attempt.isCorrect))

export const usePuzzleIsResolved = (): boolean =>
  usePuzzleStateSelector(
    (state) =>
      state.gaveUp || state.attempts.some((attempt) => attempt.isCorrect) || state.attempts.length >= MAX_ATTEMPTS,
  )

export const usePuzzleShowAttemptHistory = (): boolean =>
  usePuzzleStateSelector((state) => state.attempts.length > 0 && !state.gaveUp)

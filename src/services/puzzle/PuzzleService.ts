import { AbstractService } from "@/utils/providerish/AbstractService"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Puzzle } from "@/lib/Puzzle"
import { Species } from "@/lib/Species"
import { AttemptFeedback, createAttemptFeedback } from "@/lib/AttemptFeedback"
import { DailyResult } from "@/lib/StatsStorage"
import { StatsStorage } from "@/lib/StatsStorage"
import { DailyStatsSummary, deriveDailySummary } from "@/lib/dailyStatsSummary"
import { produce } from "immer"
import { PuzzleCompletion } from "./puzzleTypes"

export const MAX_ATTEMPTS = 3
export type PuzzleMode = "daily" | "review"

interface PuzzleServiceOptions {
  mode: PuzzleMode
  statsStorage?: StatsStorage
  onComplete?: (completion: PuzzleCompletion) => void
  onStatsSummaryUpdated?: (summary: DailyStatsSummary) => void
}

export interface PuzzleServiceState {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  attempts: AttemptFeedback[]
  gaveUp: boolean
  incorrectFeedbackText?: string
  selectedSpecies?: Species
}

export class PuzzleService extends AbstractService<PuzzleServiceState> {
  constructor(
    state: PuzzleServiceState,
    private readonly options: PuzzleServiceOptions,
  ) {
    super(state)
  }

  addAttempt = (attempt: AttemptFeedback): void =>
    this.updateState((draft) => {
      draft.attempts.push(attempt)
    })

  setSelectedSpecies = (species: Species | undefined): void => {
    this.setState({ selectedSpecies: species })
  }

  submitGuess = (species: Species): { feedback: AttemptFeedback; completion?: PuzzleCompletion } => {
    const feedback = createAttemptFeedback(species, this.state.correctSpecies)
    const nextAttempts = [...this.state.attempts, feedback]
    const incorrectFeedbackText = feedback.isCorrect
      ? undefined
      : feedback.genusMatch
        ? "Right genus - you're close!"
        : feedback.familyMatch
          ? "That's in the right family - have another go."
          : "That's not it - have another go."
    const completion =
      feedback.isCorrect || nextAttempts.length >= MAX_ATTEMPTS
        ? ({
            result: feedback.isCorrect ? DailyResult.PASS : DailyResult.FAIL,
            guessedSpeciesIds: nextAttempts.map((attempt) => attempt.speciesId),
            gaveUp: false,
          } satisfies PuzzleCompletion)
        : undefined
    this.updateState((draft) => {
      draft.attempts.push(feedback)
      draft.incorrectFeedbackText = incorrectFeedbackText
      draft.selectedSpecies = undefined
    })
    if (completion) {
      this.handleCompletion(completion)
    }
    return { feedback, completion }
  }

  giveUp = (): PuzzleCompletion => {
    this.setState({ gaveUp: true, incorrectFeedbackText: undefined, selectedSpecies: undefined })
    const completion = {
      result: DailyResult.FAIL,
      guessedSpeciesIds: this.state.attempts.map((attempt) => attempt.speciesId),
      gaveUp: true,
    }
    this.handleCompletion(completion)
    return completion
  }

  clearIncorrectFeedbackText = (): void => {
    this.setState({ incorrectFeedbackText: undefined })
  }

  private handleCompletion = (completion: PuzzleCompletion): void => {
    if (this.options.mode === "daily") {
      const { statsStorage, onStatsSummaryUpdated } = this.options
      if (!statsStorage) {
        throw new Error("PuzzleService requires stats storage in daily mode.")
      }
      const scheduledDate = this.state.scheduledDate
      if (!scheduledDate) {
        throw new Error("PuzzleService requires a scheduled date in daily mode.")
      }
      const puzzleId = this.state.puzzle.id
      const nextStats = statsStorage.update((current) =>
        produce(current, (draft) => {
          draft.history = draft.history.filter((record) => record.date !== scheduledDate)
          draft.history.push({
            date: scheduledDate,
            puzzleId,
            result: completion.result,
            guessedSpeciesIds: completion.guessedSpeciesIds,
          })
        }),
      )
      onStatsSummaryUpdated?.(deriveDailySummary(nextStats.history))
    }
    this.options.onComplete?.(completion)
  }
}

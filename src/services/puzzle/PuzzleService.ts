import { AbstractService } from "@/utils/providerish/AbstractService"
import { Iso8601Date } from "@/utils/brandedTypes"
import { Puzzle } from "@/lib/Puzzle"
import { Species, SpeciesId } from "@/lib/Species"
import { AttemptFeedback, createAttemptFeedback } from "@/lib/AttemptFeedback"
import { DailyResult } from "@/lib/StatsStorage"
import { StatsStorage } from "@/lib/StatsStorage"
import { DailyStatsSummary, deriveDailySummary } from "@/lib/dailyStatsSummary"
import { produce } from "immer"
import { PuzzleCompletion } from "./puzzleTypes"
import { findSpecies } from "@/lib/plants"
import { assert } from "tsafe"

export const MAX_ATTEMPTS = 3

export enum PuzzleMode {
  DAILY = "DAILY",
  REVIEW = "REVIEW",
}

export interface PuzzleServiceActions {
  selectImageIndex: (index: number) => void
  goToNextImage: () => void
  goToPreviousImage: () => void
  enterFullscreenImageMode: () => void
  exitFullscreenImageMode: () => void
  selectSpecies: (speciesId: SpeciesId) => void
  chooseDifferentPlant: () => void
  submitGuess: (speciesId: SpeciesId) => boolean
  giveUp: () => void
}

interface PuzzleServiceOptions {
  mode: PuzzleMode
  statsStorage?: StatsStorage
}

export interface PuzzleServiceState {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
  attempts: AttemptFeedback[]
  gaveUp: boolean
  incorrectFeedbackText?: string
  selectedSpecies?: Species
  statsSummary?: DailyStatsSummary
  imageGalleryIndex: number
  isFullscreenImageMode: boolean
}

interface PuzzleServiceBaseState {
  puzzle: Puzzle
  correctSpecies: Species
  scheduledDate?: Iso8601Date
}

export class PuzzleService extends AbstractService<PuzzleServiceState> implements PuzzleServiceActions {
  constructor(
    state: PuzzleServiceBaseState,
    private readonly options: PuzzleServiceOptions,
  ) {
    const statsSummary =
      options.mode === PuzzleMode.DAILY && options.statsStorage
        ? deriveDailySummary(options.statsStorage.load().history)
        : undefined
    super({
      ...state,
      attempts: [],
      gaveUp: false,
      incorrectFeedbackText: undefined,
      selectedSpecies: undefined,
      imageGalleryIndex: 0,
      isFullscreenImageMode: false,
      statsSummary,
    })
  }

  addAttempt = (attempt: AttemptFeedback): void =>
    this.updateState((draft) => {
      draft.attempts.push(attempt)
    })

  selectSpecies = (speciesId: SpeciesId): void => {
    const species = findSpecies(speciesId)
    assert(species, `Unknown species id: ${speciesId}`)
    this.setState({ selectedSpecies: species, incorrectFeedbackText: undefined })
  }

  chooseDifferentPlant = (): void => {
    this.setState({ selectedSpecies: undefined, incorrectFeedbackText: undefined })
  }

  selectImageIndex = (index: number): void => {
    this.setState({ imageGalleryIndex: index })
  }

  goToNextImage = (): void => {
    const { imageGalleryIndex, puzzle } = this.state
    this.selectImageIndex(imageGalleryIndex === puzzle.images.length - 1 ? 0 : imageGalleryIndex + 1)
  }

  goToPreviousImage = (): void => {
    const { imageGalleryIndex, puzzle } = this.state
    this.selectImageIndex(imageGalleryIndex === 0 ? puzzle.images.length - 1 : imageGalleryIndex - 1)
  }

  enterFullscreenImageMode = (): void => {
    this.setState({ isFullscreenImageMode: true })
  }

  exitFullscreenImageMode = (): void => {
    this.setState({ isFullscreenImageMode: false })
  }

  submitGuess = (speciesId: SpeciesId): boolean => {
    const species = findSpecies(speciesId)
    assert(species, `Unknown species id: ${speciesId}`)
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
          } satisfies PuzzleCompletion)
        : undefined
    this.updateState((draft) => {
      draft.attempts.push(feedback)
      draft.incorrectFeedbackText = incorrectFeedbackText
      draft.selectedSpecies = undefined
    })
    if (completion) {
      this.updateStats(completion.result, completion.guessedSpeciesIds)
    }
    return feedback.isCorrect
  }

  giveUp = (): void => {
    this.setState({ gaveUp: true, incorrectFeedbackText: undefined, selectedSpecies: undefined })
    const completion = {
      result: DailyResult.FAIL,
      guessedSpeciesIds: this.state.attempts.map((attempt) => attempt.speciesId),
    }
    this.updateStats(completion.result, completion.guessedSpeciesIds)
  }

  private updateStats = (result: DailyResult, guessedSpeciesIds: SpeciesId[]): void => {
    if (this.options.mode === PuzzleMode.DAILY) {
      const { statsStorage } = this.options
      assert(statsStorage, "PuzzleService requires stats storage in daily mode.")
      const scheduledDate = this.state.scheduledDate
      assert(scheduledDate, "PuzzleService requires a scheduled date in daily mode.")
      const puzzleId = this.state.puzzle.id
      const nextStats = statsStorage.update((current) =>
        produce(current, (draft) => {
          draft.history = draft.history.filter((record) => record.date !== scheduledDate)
          draft.history.push({
            date: scheduledDate,
            puzzleId,
            result,
            guessedSpeciesIds,
          })
        }),
      )
      this.setState({ statsSummary: deriveDailySummary(nextStats.history) })
    }
  }
}

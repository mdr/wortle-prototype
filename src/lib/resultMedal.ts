export const getResultMedal = (attemptCount: number, isCorrect: boolean): string => {
  if (!isCorrect) return "❌"
  if (attemptCount === 1) return "🥇"
  if (attemptCount === 2) return "🥈"
  return "🥉"
}

const getOrdinal = (n: number): string => {
  if (n === 1) return "1st"
  if (n === 2) return "2nd"
  if (n === 3) return "3rd"
  return `${n}th`
}

interface ResultDescriptionArgs {
  attemptCount: number
  isCorrect: boolean
}

export const getResultDescription = ({ attemptCount, isCorrect }: ResultDescriptionArgs): string => {
  if (!isCorrect) return "Incorrect"
  return `Correct on ${getOrdinal(attemptCount)} try`
}

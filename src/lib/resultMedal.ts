export const getResultMedal = (attemptCount: number, isCorrect: boolean): string => {
  if (!isCorrect) return "❌"
  if (attemptCount === 1) return "🥇"
  if (attemptCount === 2) return "🥈"
  return "🥉"
}

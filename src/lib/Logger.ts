export interface Logger {
  readonly error: (code: string, message: string, extraFields?: Record<string, unknown>, exception?: unknown) => void
}

export class ConsoleLogger implements Logger {
  error = (code: string, message: string, extraFields?: Record<string, unknown>, exception?: unknown): void => {
    const parts: unknown[] = [`[${code}]`, message]
    if (extraFields !== undefined) parts.push(extraFields)
    if (exception !== undefined) parts.push(exception)
    console.error(...parts)
  }
}

export const logger: Logger = new ConsoleLogger()

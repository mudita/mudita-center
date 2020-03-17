export interface Message {
  readonly id: string
  readonly values?: Record<string, string | number>
  readonly defaultMessage?: string
  readonly description?: object | string
}

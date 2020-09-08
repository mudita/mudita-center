export enum TranslationEvents {
  Get = "get-translation",
}

export interface TranslationEventResponse {
  store: Record<string, string>
  language: string
}

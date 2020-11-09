export enum ResponseStatus {
  Ok = "ok",
  Error = "error",
}

export interface Response {
  status: ResponseStatus
}

export enum EventName {
  Disconnected = "disconnected",
}

export type UnregisterListener = () => void

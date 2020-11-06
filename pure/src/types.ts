export enum ResponseStatus {
  Ok = "ok",
  Error = "error",
}

export interface Response {
  status: ResponseStatus
}

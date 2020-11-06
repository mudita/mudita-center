export enum ConnectResponseStatus {
  Ok = "ok",
  Error = "error",
}

export interface ConnectResponse {
  status: ConnectResponseStatus
}

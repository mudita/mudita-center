import { SimpleRecord } from "Common/typings"

export enum AuthProviders {
  Google = "google",
}

export interface Auth {
  [key: string]: SimpleRecord
}

export interface AuthPayload {
  provider: AuthProviders
  data: Record<string, string | number>
}

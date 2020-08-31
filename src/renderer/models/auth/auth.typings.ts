import { SimpleRecord } from "Renderer/models/phone/phone.typings"

export enum AuthProviders {
  Google = "google",
}

export interface Auth {
  [key: string]: SimpleRecord
}

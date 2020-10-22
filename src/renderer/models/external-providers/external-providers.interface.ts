import { GoogleProviderState } from "Renderer/models/external-providers/google/google.interface"

export enum Provider {
  Google = "google",
  Apple = "apple",
  Microsoft = "microsoft",
}

export interface ExternalProvidersState {
  google: GoogleProviderState
}

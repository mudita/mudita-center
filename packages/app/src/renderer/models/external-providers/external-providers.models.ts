import google from "Renderer/models/external-providers/google/google"

export interface ExternalProvidersModels {
  google: typeof google
}

export const models: ExternalProvidersModels = {
  google,
}

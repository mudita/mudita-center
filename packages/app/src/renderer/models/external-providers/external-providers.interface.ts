import {
  GoogleProviderState,
  Scope,
} from "Renderer/models/external-providers/google/google.interface"
import { AxiosRequestConfig } from "axios"

export enum Provider {
  Google = "google",
  Apple = "apple",
  Microsoft = "microsoft",
}

export interface ExternalProvidersState {
  google: GoogleProviderState
}

export interface RequestWrapperPayload {
  axiosProps: AxiosRequestConfig
  scope: Scope
  tries?: number
}

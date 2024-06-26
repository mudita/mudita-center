/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GoogleProviderState, Scope } from "./google/google.interface"
import { AxiosRequestConfig } from "axios"
import { OutlookProviderState } from "./outlook/outlook.interface"

export enum Provider {
  Google = "google",
  Apple = "apple",
  Outlook = "outlook",
  Pure = "pure",
}

export type ExternalProvider = Exclude<Provider, Provider.Pure>

export interface ExternalProvidersState {
  google: GoogleProviderState
  outlook: OutlookProviderState
}

export interface RequestWrapperPayload {
  axiosProps: AxiosRequestConfig
  scope: Scope
  tries?: number
}

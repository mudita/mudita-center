/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import {
  ExternalAuthProvidersIpcEvents,
  ExternalAuthProvidersScope,
} from "app-utils/models"
import { ExternalAuthProvider } from "./external-auth-providers.service"

export const externalAuthProviders = {
  getAuthorizationData: (
    provider: ExternalAuthProvider,
    scopes: ExternalAuthProvidersScope[]
  ) => {
    return electronAPI.ipcRenderer.invoke(
      ExternalAuthProvidersIpcEvents.GetAuthorizationData,
      { provider, scopes }
    )
  },
  getScopesData: (
    provider: ExternalAuthProvider,
    scopes: ExternalAuthProvidersScope[]
  ) => {
    return electronAPI.ipcRenderer.invoke(
      ExternalAuthProvidersIpcEvents.GetScopesData,
      { provider, scopes }
    )
  },
}

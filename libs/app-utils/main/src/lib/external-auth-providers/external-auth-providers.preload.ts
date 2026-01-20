/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import {
  ExternalAuthProvider,
  ExternalAuthProvidersIpcEvents,
  ExternalAuthProvidersScope,
} from "app-utils/models"
import {
  ExternalAuthProvidersService,
  ScopesData,
} from "./external-auth-providers.service"

export const externalAuthProviders = {
  getAuthorizationData: (
    provider: ExternalAuthProvider,
    scopes: ExternalAuthProvidersScope[]
  ): ReturnType<typeof ExternalAuthProvidersService.getAuthorizationData> => {
    return electronAPI.ipcRenderer.invoke(
      ExternalAuthProvidersIpcEvents.GetAuthorizationData,
      { provider, scopes }
    )
  },
  getScopesData: <
    P extends ExternalAuthProvider,
    S extends ExternalAuthProvidersScope[],
  >(
    provider: P,
    scopes: S
  ) => {
    return electronAPI.ipcRenderer.invoke(
      ExternalAuthProvidersIpcEvents.GetScopesData,
      { provider, scopes }
    ) as Promise<ScopesData<P, S> | { error: string }>
  },
  listenToScopesDataTransferStart: (callback?: VoidFunction) => {
    const unsubscribe = electronAPI.ipcRenderer.on(
      ExternalAuthProvidersIpcEvents.ScopesDataTransferStart,
      () => {
        callback?.()
        unsubscribe()
      }
    )
  },
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import {
  ExternalAuthProvider,
  ExternalAuthProvidersIpcEvents,
  ExternalAuthProvidersScope,
} from "app-utils/models"
import { ExternalAuthProvidersService } from "./external-auth-providers.service"

export const initExternalAuthProviders = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(ExternalAuthProvidersIpcEvents.GetAuthorizationData)
  ipcMain.handle(
    ExternalAuthProvidersIpcEvents.GetAuthorizationData,
    async (
      _,
      {
        provider,
        scopes,
      }: {
        provider: ExternalAuthProvider
        scopes: ExternalAuthProvidersScope[]
      }
    ) => {
      return ExternalAuthProvidersService.getAuthorizationData(provider, scopes)
    }
  )

  ipcMain.removeHandler(ExternalAuthProvidersIpcEvents.GetScopesData)
  ipcMain.handle(
    ExternalAuthProvidersIpcEvents.GetScopesData,
    async (
      _,
      {
        provider,
        scopes,
      }: {
        provider: ExternalAuthProvider
        scopes: ExternalAuthProvidersScope[]
      }
    ) => {
      return ExternalAuthProvidersService.getScopesData(provider, scopes)
    }
  )
}

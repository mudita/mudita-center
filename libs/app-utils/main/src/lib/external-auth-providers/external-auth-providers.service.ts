/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GoogleProvider } from "./providers/google"
import { OutlookProvider } from "./providers/outlook"
import {
  ExternalAuthProvider,
  ExternalAuthProvidersScope,
  GoogleCalendarEvent,
  GoogleContact,
  OutlookCalendarEvent,
  OutlookContact,
} from "app-utils/models"

const providers = {
  [ExternalAuthProvider.Google]: GoogleProvider,
  [ExternalAuthProvider.Outlook]: OutlookProvider,
}

export type ScopesData<
  P extends ExternalAuthProvider,
  S extends ExternalAuthProvidersScope[],
> = {
  [K in S[number]]: K extends ExternalAuthProvidersScope.Contacts
    ? P extends "google"
      ? GoogleContact[]
      : OutlookContact[]
    : K extends ExternalAuthProvidersScope.Calendar
      ? P extends "google"
        ? GoogleCalendarEvent[]
        : OutlookCalendarEvent[]
      : never
}

export class ExternalAuthProvidersService {
  static async getAuthorizationData(
    provider: ExternalAuthProvider,
    scopes: ExternalAuthProvidersScope[]
  ) {
    const authProviderInstance = new providers[provider]()
    await authProviderInstance.authenticate(scopes)
    const authData = await authProviderInstance.getAuthorizationData()
    authProviderInstance.reset()
    return authData
  }

  static async getScopesData<
    P extends ExternalAuthProvider,
    S extends ExternalAuthProvidersScope[],
  >(provider: P, scopes: S, onStartImporting?: VoidFunction) {
    const authProviderInstance = new providers[provider]()

    try {
      await authProviderInstance.authenticate(scopes)

      const data = await Promise.all(
        scopes.map((scope) => {
          return authProviderInstance.getData(scope, onStartImporting)
        })
      )

      return Object.fromEntries(
        scopes.map((scope, index) => [scope, data[index]])
      ) as ScopesData<P, S>
    } catch (error) {
      if (error === "aborted") {
        return {
          error: "aborted",
        }
      }
      return {
        error: "unknown",
      }
    } finally {
      authProviderInstance.reset()
    }
  }
}

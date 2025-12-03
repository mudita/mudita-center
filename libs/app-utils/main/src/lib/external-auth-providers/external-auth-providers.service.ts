/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GoogleCalendarEvent,
  GoogleContact,
  GoogleProvider,
} from "./providers/google"
import {
  OutlookCalendarEvent,
  OutlookContact,
  OutlookProvider,
} from "./providers/outlook"
import { ExternalAuthProvidersScope } from "app-utils/models"

const providers = {
  google: GoogleProvider,
  outlook: OutlookProvider,
}

export type ExternalAuthProvider = keyof typeof providers

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
  >(provider: P, scopes: S) {
    const authProviderInstance = new providers[provider]()

    try {
      await authProviderInstance.authenticate(scopes)

      const data = await Promise.all(
        scopes.map((scope) => {
          return authProviderInstance.getData(scope)
        })
      )

      return Object.fromEntries(
        scopes.map((scope, index) => [scope, data[index]])
      ) as {
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
    } catch {
      return null
    } finally {
      authProviderInstance.reset()
    }
  }
}

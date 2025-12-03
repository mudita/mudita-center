/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { people_v1 } from "googleapis"
import { Contact } from "@microsoft/microsoft-graph-types"

export enum ExternalAuthProvidersScope {
  Contacts = "contacts",
  Calendar = "calendar",
}

export interface ExternalAuthProvidersAuthorizationData {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export enum ExternalAuthProvider {
  Google = "google",
  Outlook = "outlook",
}

export type GoogleContact = Pick<
  people_v1.Schema$Person,
  | "names"
  | "nicknames"
  | "phoneNumbers"
  | "emailAddresses"
  | "addresses"
  | "biographies"
  | "organizations"
  | "urls"
>
export type GoogleCalendarEvent = unknown

export type OutlookContact = Contact
export type OutlookCalendarEvent = unknown

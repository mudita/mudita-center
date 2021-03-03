/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export interface GoogleCalendar {
  id: string
  summary: string
  summaryOverride?: string
  primary?: boolean
}

export interface GoogleEvent {
  id: string
  summary?: string
  description?: string
  start?: {
    dateTime?: string
    date?: string
  }
  end?: {
    dateTime?: string
    date?: string
  }
  recurrence?: string[]
}

export interface GoogleContactMetadata {
  primary?: boolean
  source: {
    type: string
    id: string
  }
}

export interface GoogleContactResourceItem {
  resourceName: string
  etag: string
  names?: {
    metadata: GoogleContactMetadata
    displayNameLastFirst: string
  }[]
  addresses?: {
    metadata: GoogleContactMetadata
    extendedAddress: string
    streetAddress: string
    postalCode: string
    city: string
  }[]
  emailAddresses?: {
    metadata: GoogleContactMetadata
    value: string
  }[]
  phoneNumbers?: {
    metadata: GoogleContactMetadata
    value: string
  }[]
  biographies?: {
    metadata: GoogleContactMetadata
    value: string
    contentType: string
  }[]
}

export interface GoogleContacts {
  connections: GoogleContactResourceItem[]
  totalPeople: number
  totalItems: number
}

export interface GoogleAuthFailedResponse {
  error: string
}

export interface GoogleAuthSuccessResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  refresh_token?: string
}

export interface GoogleCalendarsSuccess {
  items: GoogleCalendar[]
}

export interface GoogleEventsSuccess {
  kind: string
  etag: string
  summary: string
  description?: string
  updated: string
  timeZone: string
  accessRole: string
  defaultReminders: { id: string }[]
  nextPageToken?: string
  items: GoogleEvent[]
}

export enum Scope {
  Calendar = "calendar",
  Contacts = "contacts",
}

export interface GoogleProviderState {
  [Scope.Contacts]: Partial<GoogleAuthSuccessResponse>
  [Scope.Calendar]: Partial<GoogleAuthSuccessResponse>
}

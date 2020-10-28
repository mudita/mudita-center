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
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
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

export interface GoogleProviderState {
  auth: Partial<GoogleAuthSuccessResponse>
  activeCalendarId?: string
}

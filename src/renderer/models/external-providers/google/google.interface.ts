interface GoogleEventUser {
  email: string
  displayName: string
}

interface GoogleEventAttendees extends GoogleEventUser {
  responseStatus: string
  self?: boolean
  organizer?: boolean
}

export interface GoogleCalendar {
  id: string
  summary: string
  summaryOverride?: string
  timeZone: string
  primary?: boolean
  accessRole: string
}

export interface GoogleEvent {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  created: string
  updated: string
  summary?: string
  description?: string
  location: string
  creator: GoogleEventUser
  organizer: GoogleEventUser
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
  transparency?: string
  iCalUID: string
  sequence: number
  attendees: GoogleEventAttendees[]
  reminders: {
    useDefault: boolean
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
  invalidRequests: number
  auth: Partial<GoogleAuthSuccessResponse>
  activeCalendarId?: string
  // calendars: GoogleCalendar[]
  // events: GoogleEvent[]
}

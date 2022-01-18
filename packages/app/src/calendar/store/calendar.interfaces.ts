/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { ResultsState } from "App/contacts/reducers/contacts.interface"
import RRule from "rrule/dist/esm/src/rrule"
import RRuleSet from "rrule/dist/esm/src/rruleset"

export interface CalendarEvent {
  id: string
  name: string
  startDate: string
  endDate: string
  description?: string
  recurrence?: Partial<RRule> | Partial<RRuleSet>
  provider?: {
    type: Provider
    id: string
    calendarId?: string
  }
}

export interface Calendar {
  id: string
  name: string
  provider: Provider
  primary?: boolean
}

export interface CalendarState {
  calendars: Calendar[]
  events: CalendarEvent[]
  resultState: ResultsState
}

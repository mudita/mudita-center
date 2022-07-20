/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GoogleCalendar } from "App/__deprecated__/renderer/models/external-providers/google/google.interface"

export const mockedGoogleCalendars: GoogleCalendar[] = [
  {
    id: "calendar-123",
    summary: "My calendar",
    primary: true,
  },
  {
    id: "calendar-456",
    summary: "Work calendar",
  },
  {
    id: "calendar-789",
    summary: "John's calendar",
  },
]

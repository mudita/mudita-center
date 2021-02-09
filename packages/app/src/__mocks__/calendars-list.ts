/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export const mockedCalendars: Calendar[] = [
  {
    id: "jane.doe@example.com",
    name: "jane.doe@example.com",
    provider: Provider.Google,
  },
  {
    id: "john.doe@example.com",
    name: "john.doe@example.com",
    provider: Provider.Google,
    primary: true,
  },
  {
    id: "example.com_abcdefgij1234567@group.calendar.google.com",
    name: "John Doe - other calendar",
    provider: Provider.Google,
  },
  {
    id: "appnroll.com_klmnopqrstu98765432@resource.calendar.google.com",
    name: "Somebody's calendar",
    provider: Provider.Google,
  },
  {
    id: "pl.polish#holiday@group.v.calendar.google.com",
    name: "Holidays in Poland",
    provider: Provider.Google,
  },
]

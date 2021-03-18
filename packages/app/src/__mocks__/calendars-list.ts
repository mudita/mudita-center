/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export const mockedCalendars: Calendar[] = [
  {
    id: "example@mudita.com",
    name: "example@mudita.com",
    provider: Provider.Google,
  },
  {
    id: "example2@mudita.com",
    name: "example2@mudita.com",
    provider: Provider.Google,
    primary: true,
  },
  {
    id: "example3@mudita.com",
    name: "John Doe - other calendar",
    provider: Provider.Google,
  },
  {
    id: "example4@mudita.com",
    name: "Somebody's calendar",
    provider: Provider.Google,
  },
  {
    id: "example5@mudita.com",
    name: "Holidays in Poland",
    provider: Provider.Google,
  },
]

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import auth from "App/__deprecated__/renderer/models/auth/auth"
import calls from "App/__deprecated__/renderer/models/calls/calls"
import devMode from "App/__deprecated__/dev-mode/store/dev-mode"
import networkStatus from "App/__deprecated__/renderer/models/network-status/network-status"
import notes from "App/__deprecated__/renderer/models/notes/notes"
import calendar from "App/__deprecated__/calendar/store/calendar"

export interface RootModel {
  auth: typeof auth
  calls: typeof calls
  devMode: typeof devMode
  networkStatus: typeof networkStatus
  notes: typeof notes
  calendar: typeof calendar
}

export const models: RootModel = {
  auth,
  calls,
  devMode,
  networkStatus,
  notes,
  calendar,
}

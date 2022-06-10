/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Call,
  VisibilityFilter,
  CallStatus,
} from "App/__deprecated__/renderer/models/calls/calls.interface"

export const filterCalls = (
  calls: Call[],
  visibilityFilter: VisibilityFilter
) => {
  switch (visibilityFilter) {
    case VisibilityFilter.Missed:
      return calls.filter(({ status }) => status === CallStatus.Missed)
    case VisibilityFilter.Received:
      return calls.filter(({ status }) => status === CallStatus.Incoming)
    default:
      return calls
  }
}

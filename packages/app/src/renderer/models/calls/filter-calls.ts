/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  Call,
  VisibilityFilter,
  CallStatus,
} from "Renderer/models/calls/calls.interface"

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

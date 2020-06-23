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
      return calls.filter(({ status }) => status === CallStatus.Received)
    default:
      return calls
  }
}

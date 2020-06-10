import { init } from "@rematch/core"
import calls from "Renderer/models/calls/calls"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"

test("by default, visibility should be set to all calls", () => {
  const store = init({ models: { calls } })
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(VisibilityFilter.All)
})

describe("filter changes", () => {
  const desiredFilters = [
    VisibilityFilter.Missed,
    VisibilityFilter.Received,
    VisibilityFilter.All,
  ]
  const store = init({ models: { calls } })
  desiredFilters.forEach(filter => {
    test(`filter: ${filter}`, () => {
      store.dispatch.calls.changeVisibilityFilter(filter)
      const { visibilityFilter } = store.getState().calls
      expect(visibilityFilter).toBe(filter)
    })
  })
})

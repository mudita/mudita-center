import { init } from "@rematch/core"
import calls from "Renderer/models/calls/calls"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"

test("by default, visibility should be set to all calls", () => {
  const store = init({ models: { calls } })
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(VisibilityFilter.All)
})

test("filter changes", () => {
  const store = init({ models: { calls } })
  const desiredFilter = VisibilityFilter.Missed
  store.dispatch.calls.changeVisibilityFilter(desiredFilter)
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(desiredFilter)
})

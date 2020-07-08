import { init } from "@rematch/core"
import calls from "Renderer/models/calls/calls"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"

let store = init({
  models: { calls },
})

beforeEach(() => {
  store = init({
    models: { calls },
  })
})

test("by default, visibility should be set to all calls", () => {
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(VisibilityFilter.All)
})

test("deletes call", () => {
  const callToDelete = store.getState().calls.calls[0].id
  const initialCallsAmount = store.getState().calls.calls.length
  store.dispatch.calls.deleteCall([callToDelete])
  const callsAmountAfterDeleting = store.getState().calls.calls.length
  expect(callsAmountAfterDeleting).toEqual(initialCallsAmount - 1)
})

test.each([
  [VisibilityFilter.Missed, VisibilityFilter.Missed],
  [VisibilityFilter.Received, VisibilityFilter.Received],
  [VisibilityFilter.All, VisibilityFilter.All],
])("given %p filter changes", (firstArg, expectedResult) => {
  store.dispatch.calls.changeVisibilityFilter(firstArg)
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(expectedResult)
})

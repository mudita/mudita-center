import { init } from "@rematch/core"
import calls from "Renderer/models/calls/calls"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { mockData, todaysCall } from "App/__mocks__/calls-mock-data"
import selectPlugin from "@rematch/select"

const storeConfig = {
  models: { calls },
  plugins: [selectPlugin()],
}

let store = init(storeConfig)

beforeEach(() => {
  store = init(storeConfig)
})

test("by default, visibility should be set to all calls", () => {
  const { visibilityFilter } = store.getState().calls
  expect(visibilityFilter).toBe(VisibilityFilter.All)
})

test("todays call be on at the beginning of the list by default", () => {
  const filteredList = store.select.calls.filteredList(store.getState())
  expect(todaysCall).toMatchObject(filteredList[0])
})

test("deletes call", () => {
  const lookupId = mockData[0].id
  expect(
    store.getState().calls.calls.find(({ id }) => id === lookupId)
  ).toBeDefined()
  store.dispatch.calls.deleteCall([lookupId])
  expect(
    store.getState().calls.calls.find(({ id }) => id === lookupId)
  ).toBeUndefined()
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

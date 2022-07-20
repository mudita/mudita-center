/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { init } from "@rematch/core"
import calls from "App/__deprecated__/renderer/models/calls/calls"
import { Call, VisibilityFilter } from "App/__deprecated__/renderer/models/calls/calls.interface"
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

test("todays call is at the beginning of the list by default", () => {
  const callsList = store.select.calls.filteredList(store.getState())
  expect(todaysCall).toMatchObject(callsList[0])
})

test("deletes call", () => {
  const lookupId = mockData[0].id
  expect(
    store.getState().calls.calls.find(({ id }: Call) => id === lookupId)
  ).toBeDefined()
  store.dispatch.calls.deleteCall([lookupId])
  expect(
    store.getState().calls.calls.find(({ id }: Call) => id === lookupId)
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

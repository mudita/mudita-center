/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { updateSettings } from "Core/settings/requests"
import { toggleCollectionData } from "./toggle-collection-data.action"

const mockStore = createMockStore([thunk])()

jest.mock("Core/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

afterEach(() => {
  jest.resetAllMocks()
  mockStore.clearActions()
})

test("calls `updateSettings` with `true` value", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    toggleCollectionData(true) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    toggleCollectionData.pending(requestId, true),
    toggleCollectionData.fulfilled(true, requestId, true),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "collectingData",
    value: true,
  })
})

test("calls `updateSettings` with `false` value", async () => {
  expect(updateSettings).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    toggleCollectionData(false) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    toggleCollectionData.pending(requestId, false),
    toggleCollectionData.fulfilled(false, requestId, false),
  ])
  expect(updateSettings).toHaveBeenCalledWith({
    key: "collectingData",
    value: false,
  })
})

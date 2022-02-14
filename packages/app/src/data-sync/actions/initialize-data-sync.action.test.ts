/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { initializeDataSyncRequest } from "App/data-sync/requests"
import { pendingAction } from "Renderer/store"
import { DataSyncEvent } from "App/data-sync/constants"
import { initializeDataSync } from "App/data-sync/actions/initialize-data-sync.action"
import { InitializeOptions } from "App/data-sync/types"

jest.mock("App/data-sync/requests/initialize-data-sync.request.ts")
jest.mock("App/data-sync/actions/update-all-indexes.action", () => ({
  updateAllIndexes: jest.fn().mockReturnValue({
    type: pendingAction(DataSyncEvent.UpdateAllIndexes),
    payload: undefined,
  }),
}))
jest.mock("App/data-sync/actions/read-all-indexes.action", () => ({
  readAllIndexes: jest.fn().mockReturnValue({
    type: pendingAction(DataSyncEvent.ReadAllIndexes),
    payload: undefined,
  }),
}))

const options: InitializeOptions = {
  token: "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa",
  serialNumber: "1UB13213MN14K1",
}


describe("async `initializeDataSync` ", () => {
  describe("when initializeDataSyncRequest return false", () => {
    test("fire async `initializeDataSync` dispatch `updateAllIndexes`", async () => {
      ;(initializeDataSyncRequest as jest.Mock).mockReturnValue(false)

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        initializeDataSync(options) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        initializeDataSync.pending(requestId, options),
        {
          type: pendingAction(DataSyncEvent.UpdateAllIndexes),
          payload: undefined,
        },
        initializeDataSync.fulfilled(undefined, requestId, options),
      ])

      expect(initializeDataSyncRequest).toHaveBeenCalled()
    })
  })

  describe("when initializeDataSyncRequest return true", () => {
    test("fire async `initializeDataSync` dispatches `updateAllIndexes`, `ReadAllIndexes`, `SetCacheState`", async () => {
      ;(initializeDataSyncRequest as jest.Mock).mockReturnValue(true)

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        initializeDataSync(options) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        initializeDataSync.pending(requestId, options),
        {
          type: pendingAction(DataSyncEvent.UpdateAllIndexes),
          payload: undefined,
        },
        {
          type: pendingAction(DataSyncEvent.ReadAllIndexes),
          payload: undefined,
        },
        {
          type: DataSyncEvent.SetCacheState,
        },
        initializeDataSync.fulfilled(undefined, requestId, options),
      ])

      expect(initializeDataSyncRequest).toHaveBeenCalled()
    })
  })
})

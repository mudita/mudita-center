/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import {
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers/action.helper"
import { DataSyncEvent } from "App/data-sync/constants"
import { indexAllRequest } from "App/data-sync/requests"
import {
  ReadAllIndexesError,
  UpdateAllIndexesError,
} from "App/data-sync/errors"
import { testError } from "Renderer/store/constants"
import { updateAllIndexes } from "App/data-sync/actions/update-all-indexes.action"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"

jest.mock("App/data-sync/requests/index-all.request.ts")
jest.mock("App/data-sync/actions/read-all-indexes.action")

describe("async `updateAllIndexes` ", () => {
  describe("when each requests return success", () => {
    test("fire async `updateAllIndexes` dispatch `readAllIndexes`", async () => {
      ;(indexAllRequest as unknown as jest.Mock).mockReturnValue(true)
      ;(readAllIndexes as unknown as jest.Mock).mockReturnValue({
        type: pendingAction(DataSyncEvent.ReadAllIndexes),
        payload: undefined,
      })
      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(updateAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        updateAllIndexes.pending(requestId),
        {
          type: pendingAction(DataSyncEvent.ReadAllIndexes),
          payload: undefined,
        },
        updateAllIndexes.fulfilled(undefined, requestId, undefined),
      ])

      expect(indexAllRequest).toHaveBeenCalled()
    })
  })

  describe("when `updateAllIndexes` return error", () => {
    test("fire async `updateAllIndexes` returns `rejected` action", async () => {
      ;(indexAllRequest as unknown as jest.Mock).mockReturnValue(true)
      const readErrorMock = new ReadAllIndexesError("Read All Indexes fails")
      ;(readAllIndexes as unknown as jest.Mock).mockReturnValue({
        type: rejectedAction(DataSyncEvent.ReadAllIndexes),
        payload: readErrorMock,
      })
      const errorMock = new UpdateAllIndexesError("Update All Indexes fails:read indexes")
      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(updateAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        updateAllIndexes.pending(requestId),
        {
          type: rejectedAction(DataSyncEvent.ReadAllIndexes),
          payload: readErrorMock,
        },
        updateAllIndexes.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(indexAllRequest).toHaveBeenCalled()
    })
  })
})

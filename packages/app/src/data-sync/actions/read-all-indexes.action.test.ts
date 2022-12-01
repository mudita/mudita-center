/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { DataSyncError } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { SerialisedIndexData } from "elasticlunr"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("App/data-sync/requests/get-index.request.ts")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIndexResponse: SerialisedIndexData<any> = {
  fields: [],
  index: {},
  pipeline: [],
  ref: "",
  version: "",
  documentStore: { docInfo: {}, docs: {} },
}

describe("async `readAllIndexes` ", () => {
  describe("when each requests return success", () => {
    test("fire async `readAllIndexes` returns `AllIndexes`", async () => {
      ;(getIndexRequest as jest.Mock).mockReturnValue(getIndexResponse)

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(readAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        readAllIndexes.pending(requestId),
        readAllIndexes.fulfilled(
          { contacts: {}, messages: {}, threads: {}, templates: {} },
          requestId,
          undefined
        ),
      ])

      expect(getIndexRequest).toHaveBeenCalled()
    })
  })

  describe("when `getIndexRequest` return undefined", () => {
    test("fire async `readAllIndexes` returns `rejected` action", async () => {
      ;(getIndexRequest as jest.Mock).mockReturnValue(undefined)
      const errorMock = new AppError(
        DataSyncError.ReadAllIndexes,
        "Read All Indexes fails"
      )

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(readAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        readAllIndexes.pending(requestId),
        readAllIndexes.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getIndexRequest).toHaveBeenCalled()
    })
  })
})

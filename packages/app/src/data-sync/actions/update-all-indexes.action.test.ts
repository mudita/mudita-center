/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { SerialisedIndexData } from "elasticlunr"
import {
  getIndexRequest,
  indexAllRequest,
  updateAllIndexes,
} from "App/data-sync"
import { UpdateAllIndexesError } from "App/data-sync/errors"
import { testError } from "Renderer/store/constants"

jest.mock("App/data-sync/requests/get-index.request.ts")
jest.mock("App/data-sync/requests/index-all.request.ts")

const getIndexResponse: SerialisedIndexData<any> = {
  fields: [],
  index: {},
  pipeline: [],
  ref: "",
  version: "",
  documentStore: { docInfo: {}, docs: {} },
}

describe("async `updateAllIndexes` ", () => {
  describe("when each requests return success", () => {
    test("fire async `updateAllIndexes` returns `AllIndexes`", async () => {
      ;(getIndexRequest as jest.Mock).mockReturnValue(getIndexResponse)

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(updateAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        updateAllIndexes.pending(requestId),
        updateAllIndexes.fulfilled({ contacts: {} }, requestId, undefined),
      ])

      expect(indexAllRequest).toHaveBeenCalled()
      expect(getIndexRequest).toHaveBeenCalled()
    })
  })

  describe("when `getIndexRequest` return undefined", () => {
    test("fire async `updateAllIndexes` returns `rejected` action", async () => {
      ;(getIndexRequest as jest.Mock).mockReturnValue(undefined)
      const errorMock = new UpdateAllIndexesError(
        "Update All Indexes fails"
      )

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(updateAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        updateAllIndexes.pending(requestId),
        updateAllIndexes.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(indexAllRequest).toHaveBeenCalled()
      expect(getIndexRequest).toHaveBeenCalled()
    })
  })
})

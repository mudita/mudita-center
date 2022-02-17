/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { SerialisedIndexData } from "elasticlunr"
import { getIndexRequest } from "App/data-sync/requests"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { ReadAllIndexesError } from "App/data-sync/errors"
import { testError } from "Renderer/store/constants"

jest.mock("App/data-sync/requests/get-index.request.ts")

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
      } = await mockStore.dispatch(readAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        readAllIndexes.pending(requestId),
        readAllIndexes.fulfilled(
          { contacts: {}, messages: {}, threads: {} },
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
      const errorMock = new ReadAllIndexesError("Read All Indexes fails")

      const mockStore = createMockStore([thunk])()

      const {
        meta: { requestId },
      } = await mockStore.dispatch(readAllIndexes() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        readAllIndexes.pending(requestId),
        readAllIndexes.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getIndexRequest).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponseStatus } from "App/core/types"
import { AnyAction } from "@reduxjs/toolkit"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import StorageInfo from "App/__deprecated__/common/interfaces/storage-info.interface"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { loadStorageInfoAction } from "App/device/actions/load-storage-info.action"
import { ReduxRootState } from "App/__deprecated__/renderer/store"

jest.mock(
  "App/__deprecated__/renderer/requests/get-storage-info.request"
)

const storageInfo: StorageInfo = {
  categories: [],
  reservedSpace: 0,
  totalSpace: 0,
  usedUserSpace: 0,
}

const state = {} as ReduxRootState

describe("`loadStorageInfoAction` returns `StorageInfo`", () => {
  test("fire async `loadStorageInfoAction`", async () => {
    const store = createMockStore([thunk])(state)
    ;(getStorageInfo as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: storageInfo,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await store.dispatch(loadStorageInfoAction() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      loadStorageInfoAction.pending(requestId),
      loadStorageInfoAction.fulfilled(storageInfo, requestId, undefined),
    ])

    expect(getStorageInfo).toHaveBeenCalled()
  })
})

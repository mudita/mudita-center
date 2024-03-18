/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { deleteFilesRequest } from "Core/files-manager/requests/delete-files.request"
import { initialState } from "Core/files-manager/reducers"
import { Result, ResultObject } from "Core/core/builder"
import { deleteFiles } from "Core/files-manager/actions/delete-files.action"
import { AppError } from "Core/core/errors"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import {
  fulfilledAction,
  pendingAction,
} from "Core/__deprecated__/renderer/store"
import * as loadStorageInfoActionModule from "Core/device/actions/load-storage-info.action"
import * as loadDeviceDataActionModule from "Core/device/actions/load-device-data.action"
import { DeviceEvent } from "Core/device"

jest.mock("Core/settings/store/schemas/generate-application-id", () => ({
  generateApplicationId: () => "123",
}))

jest.mock("Core/files-manager/requests/delete-files.request")
jest
  .spyOn(loadStorageInfoActionModule, "loadStorageInfoAction")
  .mockImplementation(
    () =>
      ({
        type: pendingAction(DeviceEvent.LoadStorageInfo),
      } as unknown as jest.Mock)
  )
jest.spyOn(loadDeviceDataActionModule, "loadDeviceData").mockImplementation(
  () =>
    ({
      type: fulfilledAction(DeviceEvent.LoadDeviceData),
    } as unknown as jest.Mock)
)
const filePaths = [
  "user/music/example_file_name.mp3",
  "user/music/second_example_file_name.wav",
]

const successObjectResult: ResultObject<string[]> = Result.success(filePaths)

const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")
const failedObjectResult = Result.failed(errorMock)

describe("when `deleteFiles` request return success result", () => {
  test("returns string list", async () => {
    ;(deleteFilesRequest as jest.Mock).mockReturnValue(successObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(deleteFiles(filePaths) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      deleteFiles.pending(requestId, filePaths),
      {
        type: pendingAction(DeviceEvent.LoadStorageInfo),
      },
      {
        type: fulfilledAction(DeviceEvent.LoadDeviceData),
      },
      deleteFiles.fulfilled(successObjectResult.data, requestId, filePaths),
    ])

    expect(deleteFilesRequest).toHaveBeenCalled()
  })
})

describe("when `deleteFiles` request return failed result", () => {
  test("returns error", async () => {
    ;(deleteFilesRequest as jest.Mock).mockReturnValue(failedObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(deleteFiles(filePaths) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      deleteFiles.pending(requestId, filePaths),
      deleteFiles.rejected(testError, requestId, filePaths, { ...errorMock }),
    ])

    expect(deleteFilesRequest).toHaveBeenCalled()
  })
})

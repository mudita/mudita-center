/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { downloadUpdates } from "App/update/actions/download-updates/download-updates.action"
import {
  Product,
  OsReleaseType,
  UpdateError,
  UpdateOsEvent,
  ReleaseProcessState,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { DownloadStatus } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { testError } from "App/__deprecated__/renderer/store/constants"
import * as downloadOsUpdateRequestModule from "App/update/requests/download-os-update.request"
import * as osUpdateAlreadyDownloadedCheckModule from "App/update/requests/os-update-already-downloaded.request"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const mockedRelease: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.1.0",
  mandatoryVersions: [],
}

const mockedRelease2: OsRelease = {
  date: "2021-02-02",
  file: {
    name: "test file",
    size: 123,
    url: "some-url",
  },
  product: Product.PurePhone,
  type: OsReleaseType.Daily,
  version: "1.2.0",
  mandatoryVersions: [],
}

const params = { releases: [mockedRelease, mockedRelease2] }

const getUpdatingDownloadActionProcessParams = (
  version: string,
  progressState: ReleaseProcessState
) => {
  return {
    type: UpdateOsEvent.UpdateDownloadStateFile,
    payload: {
      state: progressState,
      version,
    },
  }
}

describe("when battery is lower than 40%", () => {
  test("the action is rejected", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: 0.39,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadUpdates(params) as unknown as AnyAction
    )

    const error = new AppError(
      UpdateError.TooLowBattery,
      "Device has too low battery level"
    )

    expect(mockStore.getActions()).toEqual([
      downloadUpdates.pending(requestId, params),
      downloadUpdates.rejected(testError, requestId, params, error),
    ])
  })
})

describe("when some of the updates have been downloaded before", () => {
  test("the action is fulfilled and updating download process actions are dispatched for all downloaded files", async () => {
    jest
      .spyOn(
        osUpdateAlreadyDownloadedCheckModule,
        "osUpdateAlreadyDownloadedCheck"
      )
      .mockResolvedValue(true)

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: 0.55,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadUpdates(params) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      downloadUpdates.pending(requestId, params),
      getUpdatingDownloadActionProcessParams(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      getUpdatingDownloadActionProcessParams("1.1.0", ReleaseProcessState.Done),
      getUpdatingDownloadActionProcessParams(
        "1.2.0",
        ReleaseProcessState.InProgress
      ),
      getUpdatingDownloadActionProcessParams("1.2.0", ReleaseProcessState.Done),
      downloadUpdates.fulfilled(undefined, requestId, params),
    ])
  })
})

describe("when update downloads successfully", () => {
  test("the action is fulfilled", async () => {
    jest
      .spyOn(
        osUpdateAlreadyDownloadedCheckModule,
        "osUpdateAlreadyDownloadedCheck"
      )
      .mockResolvedValue(false)

    jest
      .spyOn(downloadOsUpdateRequestModule, "downloadOsUpdateRequest")
      .mockResolvedValue(
        Result.success({
          directory: "somedir",
          status: DownloadStatus.Completed,
          totalBytes: 123,
        })
      )

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: 0.55,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadUpdates(params) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      downloadUpdates.pending(requestId, params),
      getUpdatingDownloadActionProcessParams(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      getUpdatingDownloadActionProcessParams("1.1.0", ReleaseProcessState.Done),
      getUpdatingDownloadActionProcessParams(
        "1.2.0",
        ReleaseProcessState.InProgress
      ),
      getUpdatingDownloadActionProcessParams("1.2.0", ReleaseProcessState.Done),
      downloadUpdates.fulfilled(undefined, requestId, params),
    ])
  })
})

describe("when download is cancelled by user", () => {
  test("action is rejected with cancelled error", async () => {
    jest
      .spyOn(
        osUpdateAlreadyDownloadedCheckModule,
        "osUpdateAlreadyDownloadedCheck"
      )
      .mockResolvedValueOnce(false)

    const resultWithCancelledError: ResultObject<DownloadStatus.Cancelled> =
      Result.failed(new AppError("", ""), DownloadStatus.Cancelled)
    jest
      .spyOn(downloadOsUpdateRequestModule, "downloadOsUpdateRequest")
      .mockResolvedValueOnce(resultWithCancelledError)

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: 0.55,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadUpdates(params) as unknown as AnyAction
    )

    const error = new AppError(
      UpdateError.DownloadCancelledByUser,
      "Download cancelled by user"
    )

    expect(mockStore.getActions()).toEqual([
      downloadUpdates.pending(requestId, params),
      getUpdatingDownloadActionProcessParams(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      downloadUpdates.rejected(testError, requestId, params, error),
    ])
  })
})

describe("when download failed", () => {
  test("action is rejected with cancelled error", async () => {
    jest
      .spyOn(
        osUpdateAlreadyDownloadedCheckModule,
        "osUpdateAlreadyDownloadedCheck"
      )
      .mockResolvedValueOnce(false)

    const downloadFailedResult: ResultObject<DownloadStatus.Interrupted> =
      Result.failed(new AppError("", ""), DownloadStatus.Interrupted)
    jest
      .spyOn(downloadOsUpdateRequestModule, "downloadOsUpdateRequest")
      .mockResolvedValueOnce(downloadFailedResult)

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          batteryLevel: 0.55,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      downloadUpdates(params) as unknown as AnyAction
    )

    const error = new AppError(
      UpdateError.UnexpectedDownloadError,
      "Unexpected error while downloading update"
    )

    expect(mockStore.getActions()).toEqual([
      downloadUpdates.pending(requestId, params),
      getUpdatingDownloadActionProcessParams(
        "1.1.0",
        ReleaseProcessState.InProgress
      ),
      downloadUpdates.rejected(testError, requestId, params, error),
    ])
  })
})

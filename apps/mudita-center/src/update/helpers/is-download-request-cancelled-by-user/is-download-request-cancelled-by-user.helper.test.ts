/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "App/core/builder"
import { AppError } from "App/core/errors"
import { isDownloadRequestCanelledByUser } from "App/update/helpers"
import {
  DownloadFinished,
  DownloadStatus,
} from "App/__deprecated__/renderer/interfaces/file-download.interface"

test("returns false for succeeded request", () => {
  const downloadFinishedSuccessParams: DownloadFinished = {
    directory: "some dir",
    status: DownloadStatus.Completed,
    totalBytes: 123,
  }
  expect(
    isDownloadRequestCanelledByUser(
      Result.success(downloadFinishedSuccessParams)
    )
  ).toEqual(false)
})

test("returns false for failed request and status different than cancelled", () => {
  const failedResult: ResultObject<DownloadStatus.Interrupted> = Result.failed(
    new AppError("", ""),
    DownloadStatus.Interrupted
  )

  expect(isDownloadRequestCanelledByUser(failedResult)).toEqual(false)
})

test("returns true for failed request and status equal to cancelled", () => {
  const failedResult: ResultObject<DownloadStatus.Cancelled> = Result.failed(
    new AppError("", ""),
    DownloadStatus.Cancelled
  )

  expect(isDownloadRequestCanelledByUser(failedResult)).toEqual(true)
})

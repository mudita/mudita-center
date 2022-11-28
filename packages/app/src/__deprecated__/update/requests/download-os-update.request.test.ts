/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { downloadOsUpdateRequest } from "App/__deprecated__/update/requests/download-os-update.request"
import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import { DownloadStatus } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"

test("successful download returns data", async () => {
  const data = {
    status: DownloadStatus.Completed,
    directory: "some/directory/",
    totalBytes: 123213,
  }
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  ;(ipcRenderer as any).__rendererCalls = {
    [PureOsDownloadChannels.start]: data,
  }
  const result = await downloadOsUpdateRequest({
    url: "mudita.com/releases-example",
    fileName: "pure-os.tar",
  })
  expect(result).toStrictEqual(Result.success(data))
})

test.each([
  DownloadStatus.Interrupted,
  DownloadStatus.Cancelled,
  DownloadStatus.Paused,
])(
  "test cases for failing the download request with status: %s,  returns error",
  async (downloadStatus) => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(ipcRenderer as any).__rendererCalls = {
      [PureOsDownloadChannels.start]: {
        status: downloadStatus,
      },
    }

    const result = await downloadOsUpdateRequest({
      url: "mudita.com/releases-example",
      fileName: "pure-os.tar",
    })

    expect(result).toEqual(Result.failed(new AppError("", ""), downloadStatus))
  }
)

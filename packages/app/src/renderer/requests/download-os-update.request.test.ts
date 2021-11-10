/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import downloadOsUpdateRequest from "Renderer/requests/download-os-update.request"
import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import { DownloadStatus } from "Renderer/interfaces/file-download.interface"

test("successful download returns data", async () => {
  const data = {
    status: DownloadStatus.Completed,
    directory: "some/directory/",
    totalBytes: 123213,
  }
  ;(ipcRenderer as any).__rendererCalls = {
    [PureOsDownloadChannels.start]: data,
  }
  const result = await downloadOsUpdateRequest({
    url: "mudita.com/releases-example",
    fileName: "pure-os.tar",
  })
  expect(result).toStrictEqual(data)
})

test.each([
  [
    DownloadStatus.Interrupted,
    "There was a problem when downloading OS update",
  ],
  [DownloadStatus.Cancelled, "There was a problem when downloading OS update"],
  [DownloadStatus.Paused, "There was a problem when downloading OS update"],
])(
  "test cases for failing the download request with status: %s,  returns error: %s",
  async (downloadStatus, errorMessage) => {
    ;(ipcRenderer as any).__rendererCalls = {
      [PureOsDownloadChannels.start]: {
        status: downloadStatus,
      },
    }
    await expect(
      downloadOsUpdateRequest({
        url: "mudita.com/releases-example",
        fileName: "pure-os.tar",
      })
    ).rejects.toThrowError(errorMessage)
  }
)

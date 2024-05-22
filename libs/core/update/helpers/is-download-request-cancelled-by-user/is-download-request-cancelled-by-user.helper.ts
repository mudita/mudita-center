/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { downloadOsUpdateRequest } from "Core/update/requests"
import { DownloadStatus } from "Core/__deprecated__/renderer/interfaces/file-download.interface"

export const isDownloadRequestCanelledByUser = (
  result: Awaited<ReturnType<typeof downloadOsUpdateRequest>>
): boolean => {
  return !result.ok && result.data === DownloadStatus.Cancelled
}

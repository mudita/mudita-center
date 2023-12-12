/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFile } from "Core/device-file-system/dto"
import { DeviceFilesOption } from "Core/device-file-system/types"

// DEPRECATED
import { formatDate } from "Core/__deprecated__/renderer/utils/format-date"

export const transformDeviceFilesByOption = (
  deviceFiles: DeviceFile[],
  { datePrefix }: DeviceFilesOption
): DeviceFile[] => {
  if (datePrefix) {
    const todayFormatDate = formatDate(new Date())
    return deviceFiles.map((file) => ({
      ...file,
      name: `${todayFormatDate}-${file.name}`,
    }))
  } else {
    return deviceFiles
  }
}

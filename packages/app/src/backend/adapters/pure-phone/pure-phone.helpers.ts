/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceFileDeprecated } from "Backend/device-file-system-service/device-file-system-service"
import { DeviceFilesOption } from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import { formatDate } from "Renderer/utils/format-date"

export const transformDeviceFilesByOption = (
  deviceFiles: DeviceFileDeprecated[],
  { datePrefix }: DeviceFilesOption
): DeviceFileDeprecated[] => {
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

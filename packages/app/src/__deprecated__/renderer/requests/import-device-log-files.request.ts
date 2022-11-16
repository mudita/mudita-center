/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getDeviceLogFiles } from "App/device-log/requests"
import writeFile from "App/__deprecated__/renderer/requests/write-file.request"

const importDeviceLogFiles = async (cwd: string): Promise<boolean> => {
  const { ok, data = [] } = await getDeviceLogFiles({ datePrefix: true })

  if (!ok) {
    return false
  }

  for (let i = 0; i < data.length; i++) {
    const deviceLogFile = data[i]
    const writeFileSuccess = await writeFile({
      cwd,
      data: deviceLogFile.data,
      fileName: deviceLogFile.name,
    })
    if (!writeFileSuccess) {
      return false
    }
  }

  return true
}

export default importDeviceLogFiles

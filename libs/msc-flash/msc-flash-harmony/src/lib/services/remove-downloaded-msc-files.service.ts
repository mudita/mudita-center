/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"
import logger from "Core/__deprecated__/main/utils/logger"
import fs from "fs-extra"
import path from "path"

export const removeDownloadedMscFiles = async () => {
  const { osDownloadLocation } = await getAppSettingsMain()

  try {
    const files = await fs.readdir(osDownloadLocation)

    files.forEach((file) => {
      const fileDir = path.join(osDownloadLocation, file)
      fs.unlinkSync(fileDir)
    })
  } catch (error) {
    logger.error(error)
  }
}

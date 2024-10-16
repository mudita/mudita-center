/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"
import path from "path"
import { execPromise } from "shared/utils"

export const unpackFlashingImageService = async (
  fileName: string
): Promise<void> => {
  let command: string = ""

  const { osDownloadLocation } = await getAppSettingsMain()

  if (process.platform === "darwin" || process.platform === "linux") {
    const imageFilePath = path.join(osDownloadLocation, fileName)
    command = `tar -xf "${imageFilePath}" -C "${osDownloadLocation}"`
  }
  if (process.platform === "win32") {
    const imageFilePath = path.join(osDownloadLocation, fileName)
    command = `tar -xzvf "${imageFilePath}" -C "${osDownloadLocation}"`
  }

  try {
    await execPromise(command)
  } catch (error) {
    console.error("Failed to unpack files", error)
    throw error
  }
}

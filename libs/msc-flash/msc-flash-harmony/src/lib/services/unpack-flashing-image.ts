/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"
import { execPromise } from "shared/utils"

export const unpackFlashingImageService = async (
  fileName: string
): Promise<void> => {
  let command: string = ""

  if (process.platform === "darwin" || process.platform === "linux") {
    command = `tar -xf ${fileName}`
  }

  const { osDownloadLocation } = await getAppSettingsMain()

  try {
    await execPromise(`cd "${osDownloadLocation}"`)
    const stdout = await execPromise("pwd")
    console.log("Ściezka w której jestem to: ", stdout)
    const list = await execPromise(`ls`)
    console.log("Lista: ", list)
  } catch (error) {
    console.error("Failed to unpack files", error)
    throw error
  }
}

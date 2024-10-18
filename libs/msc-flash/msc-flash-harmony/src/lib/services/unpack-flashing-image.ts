/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getAppSettingsMain from "Core/__deprecated__/main/functions/get-app-settings"
import path from "path"
import { execPromise } from "shared/utils"
import { getImageFilePathAndName } from "./dev-flash-mode"

export const unpackFlashingImageService = async (
  fileName: string
): Promise<void> => {
  let command: string = ""

  const { osDownloadLocation } = await getAppSettingsMain()

  if (process.platform === "darwin" || process.platform === "linux") {
    const { flashPackagePath, resolvedFileName } = getImageFilePathAndName(
      osDownloadLocation,
      fileName,
      ".tar.xz"
    )
    const imageFilePath = path.join(flashPackagePath, resolvedFileName)
    command = `tar -xf "${imageFilePath}" -C "${osDownloadLocation}"`
  }
  if (process.platform === "win32") {
    const { flashPackagePath, resolvedFileName } = getImageFilePathAndName(
      osDownloadLocation,
      fileName,
      ".tar.gz"
    )
    const imageFilePathTarGz = path.join(flashPackagePath, resolvedFileName)
    const baseName = path.basename(resolvedFileName, ".tar.gz")
    const imageFilePathTar = path.join(
      flashPackagePath,
      `${baseName}.tar`,
      `${baseName}.tar`
    )
    command = `tar -xzvf "${imageFilePathTarGz}" -C "${osDownloadLocation}" && tar -xvf "${imageFilePathTar}" -C "${osDownloadLocation}" `
  }

  try {
    await execPromise(command)
  } catch (error) {
    console.error("Failed to unpack files", error)
    throw error
  }
}

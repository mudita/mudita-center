/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"

const flashPackagePath = process.env.DEV_FLASH_PACKAGE_PATH

const findLatestTarXzFile = (dir: string, extension: string): string | null => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(extension))
    .map((file) => ({
      file,
      time: fs.statSync(path.join(dir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time)

  return files.length > 0 ? files[0].file : null
}

export const getImageFilePathAndName = (
  osDownloadLocation: string,
  fileName: string,
  extension: string
): { flashPackagePath: string; resolvedFileName: string } => {
  if (flashPackagePath) {
    const fileName = findLatestTarXzFile(flashPackagePath, extension) ?? ""
    return {
      resolvedFileName: fileName,
      flashPackagePath: flashPackagePath,
    }
  } else {
    return {
      resolvedFileName: fileName,
      flashPackagePath: osDownloadLocation,
    }
  }
}

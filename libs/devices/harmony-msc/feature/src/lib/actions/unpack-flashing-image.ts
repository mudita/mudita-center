/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppFileSystem, AppPath } from "app-utils/renderer"
import {
  AppError,
  AppResult,
  AppResultFactory,
  getMscHarmonyLocation,
  MSC_HARMONY_SCOPE_CATALOG_DIR,
  Platform,
  platform,
} from "app-utils/models"
import { FlashPostRequest, MscFlashDetails } from "devices/harmony-msc/models"
import { sliceSegments } from "app-utils/common"

export const unpackFlashingImage = async (
  mscFlashDetails: MscFlashDetails,
  signal: AbortSignal
): Promise<AppResult<FlashPostRequest>> => {
  const result = await AppFileSystem.extract({
    ...getMscHarmonyLocation(mscFlashDetails.image.name),
    scopeDestinationPath: MSC_HARMONY_SCOPE_CATALOG_DIR,
  })

  if (signal.aborted) {
    return AppResultFactory.failed(new AppError("Aborted", "Aborted"))
  }

  if (!result.ok) {
    return result
  }

  const imagePath = result.data[0]
  const mscHarmonyAbsoluteDirPath = sliceSegments(imagePath, 0, -1)

  const scriptName =
    platform === Platform.windows
      ? mscFlashDetails.scripts.find((script) =>
          script.name.includes("flash_with_dd")
        )?.name
      : mscFlashDetails.scripts[0].name

  if (!scriptName) {
    return AppResultFactory.failed(
      new AppError("No suitable flashing script found for the current platform")
    )
  }

  const scriptPath = await AppPath.join(mscHarmonyAbsoluteDirPath, scriptName)

  return AppResultFactory.success({ scriptPath, imagePath })
}

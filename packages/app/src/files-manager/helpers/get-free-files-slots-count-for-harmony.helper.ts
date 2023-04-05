/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { filesSlotsHarmonyLimit } from "App/files-manager/constants/files-slots-harmony-limit.constans"

export const getHarmonyFreeFilesSlotsCount = (filesCount: number): number => {
  return Math.max(filesSlotsHarmonyLimit - filesCount, 0)
}

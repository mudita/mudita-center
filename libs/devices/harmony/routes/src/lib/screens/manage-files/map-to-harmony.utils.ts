/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyFile } from "devices/harmony/models"

export const sumFileSizes = (files: HarmonyFile[]) =>
  files.reduce((acc, f) => acc + f.fileSize, 0)

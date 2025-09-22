/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyFile } from "devices/harmony/models"

export const mebiToBytes = (n?: string | number) =>
  isNaN(Number(n)) ? 0 : Math.round(Number(n) * 1024 * 1024)

export const sumFileSizes = (files: HarmonyFile[]) =>
  files.reduce((acc, f) => acc + f.fileSize, 0)

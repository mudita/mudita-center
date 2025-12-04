/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegacyProduct, Platform } from "app-utils/models"

export interface MscFlashFile {
  url: string
  name: string
  size?: number
}

export interface MscFlashDetails {
  version: string
  product: LegacyProduct
  platform: Platform
  image: MscFlashFile
  scripts: MscFlashFile[]
}

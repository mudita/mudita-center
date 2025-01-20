/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "Core/update/constants"
import { SupportedPlatform } from "../constants"

interface File {
  url: string
  name: string
  size?: number
}

export interface MscFlashDetails {
  version: string
  product: Product
  platform: SupportedPlatform
  image: File
  scripts: File[]
}

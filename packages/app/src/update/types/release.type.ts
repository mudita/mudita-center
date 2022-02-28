/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "App/main/constants"

export interface Release {
  version: string
  date: string
  prerelease: boolean
  product: Product
  file: {
    url: string
    name: string
    size: number
  }
  devMode?: boolean
}

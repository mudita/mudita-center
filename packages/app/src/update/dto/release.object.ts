/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product, ReleaseType } from "App/update/constants"

export interface Release {
  version: string
  date: string
  type: ReleaseType
  product: Product
  file: {
    url: string
    name: string
    size: number
  }
  mandatoryVersions: string[]
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "App/update/constants"

export interface ReleaseManifest {
  version: string
  date: string
  product: Product
  file: {
    url: string
    size: number
    name: string
  }
  mandatoryVersions: string[]
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product, OsReleaseType } from "App/update/constants"

export interface OsRelease {
  version: string
  date: string
  type: OsReleaseType
  product: Product
  file: {
    url: string
    name: string
    size: number
  }
  mandatoryVersions: string[]
}

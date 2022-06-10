/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "App/__deprecated__/main/constants"

export interface ManifestReleases {
  version: string
  platform: string
  target: Product
  options: string
  files: {
    tar: string
    image: string
  }
  checksums: Record<string, string>
}

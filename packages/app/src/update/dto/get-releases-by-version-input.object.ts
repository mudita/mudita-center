/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "App/update/constants"

export interface GetReleasesByVersionsInput {
  product: Product
  versions: string[]
}

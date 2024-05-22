/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import brie from "brie"
import { features } from "Core/feature-flags/features"
import { serializeFeature } from "Core/feature-flags/helpers/serialize-features.helpers"

export const flags = brie.setup({
  data: null,
  features: serializeFeature(features),
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import google from "Renderer/models/external-providers/google/google"
import outlook from "Renderer/models/external-providers/outlook/outlook"

export interface ExternalProvidersModels {
  google: typeof google
  outlook: typeof outlook
}

export const models: ExternalProvidersModels = {
  google,
  outlook,
}

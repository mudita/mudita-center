/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import outlook from "Core/__deprecated__/renderer/models/external-providers/outlook/outlook"

export interface ExternalProvidersModels {
  outlook: typeof outlook
}

export const models: ExternalProvidersModels = {
  outlook,
}

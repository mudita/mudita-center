/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mcImportContactsButton, mcOverview } from "generic-view/models"
import { generateMcImportContactsButtonConfig } from "./lib/mc-import-contacts-button/config"
import { generateMcOverviewViewLayout } from "./lib/mc-overview-view/config"

export const uiGenerators = {
  [mcOverview.key]: {
    config: generateMcOverviewViewLayout,
  },
  [mcImportContactsButton.key]: {
    config: generateMcImportContactsButtonConfig,
  },
} as const

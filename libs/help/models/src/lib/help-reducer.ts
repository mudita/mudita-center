/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpData } from "./help-data"

export interface HelpReducer {
  data: Omit<HelpData, "nextSyncToken">
  ratedArticles: string[]
}

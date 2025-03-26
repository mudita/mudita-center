/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DevicesReducer } from "devices/common/models"
import { AppMenuReducer } from "app-routing/models"
import { NewsReducer } from "news/models"

export type AppState = {
  devices: DevicesReducer
  appMenu: AppMenuReducer
  news: NewsReducer
}

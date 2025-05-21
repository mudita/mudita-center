/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegacyIconType } from "app-theme/models"
import { legacyIcons } from "./icons"

export const getIconType = (icon: LegacyIconType = LegacyIconType.Message) => {
  return legacyIcons[icon]
}

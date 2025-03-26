/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegacyIconType } from "app-theme/models"

export const getEnumName = (type?: LegacyIconType): string | null => {
  return type !== undefined ? LegacyIconType[type] : null
}

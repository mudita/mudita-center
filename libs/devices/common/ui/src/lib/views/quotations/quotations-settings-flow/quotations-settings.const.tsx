/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  QuotationSettings,
  QuotationSettingsGroup,
} from "devices/common/models"

export const DEFAULT_QUOTATION_SETTINGS: QuotationSettings = {
  interval: "AtMidnight",
  group: QuotationSettingsGroup.Predefined,
}

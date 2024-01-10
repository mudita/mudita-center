/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntryType } from "Core/device/constants"
import {
  NotificationResourceType,
} from "Core/notification/constants/index"

export const resourceTypeMap: Record<OutboxEntryType, NotificationResourceType> = {
  [OutboxEntryType.Message]: NotificationResourceType.Message,
  [OutboxEntryType.Thread]: NotificationResourceType.Thread,
  [OutboxEntryType.Contact]: NotificationResourceType.Contact,
}

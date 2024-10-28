/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedMessage } from "device/models"
import { MessageObject, ThreadObject } from "Core/data-sync/types"

export interface PureToUnifiedMessageOptions {
  threads: Record<string, ThreadObject>
  messages: Record<string, MessageObject>
}

export const pureToUnifiedMessage = ({
  messages,
  threads,
}: PureToUnifiedMessageOptions): UnifiedMessage[] => {
  // TODO
}

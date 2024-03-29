/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Message as MessageInterface } from "Core/__deprecated__/renderer/interfaces/message.interface"

export interface ButtonTogglerItemProps {
  filled?: boolean
  active?: boolean
  loading?: boolean
}

export interface ButtonTogglerProps {
  filled?: boolean
  tooltipId?: string
  tooltipTitle?: MessageInterface
  tooltipDescription?: MessageInterface
}

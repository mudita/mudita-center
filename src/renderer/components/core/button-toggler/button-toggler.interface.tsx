/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Message as MessageInterface } from "Renderer/interfaces/message.interface"

export interface ButtonTogglerItemProps {
  filled?: boolean
  active?: boolean
}

export interface ButtonTogglerProps {
  filled?: boolean
  tooltipTitle?: MessageInterface
  tooltipDescription?: MessageInterface
}

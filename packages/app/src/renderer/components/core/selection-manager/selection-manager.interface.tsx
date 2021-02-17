/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ChangeEvent, ReactElement } from "react"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { Message } from "Renderer/interfaces/message.interface"

export interface SelectionManagerProps {
  checkboxSize?: Size
  selectedItemsNumber: number
  allItemsSelected?: boolean
  message: Message
  buttons?: ReactElement[]
  enlarged?: boolean
  onToggle?: (e?: ChangeEvent) => void
}

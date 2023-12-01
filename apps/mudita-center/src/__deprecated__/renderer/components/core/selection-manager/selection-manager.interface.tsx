/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent, ReactElement } from "react"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { Message } from "App/__deprecated__/renderer/interfaces/message.interface"

export interface SelectionManagerProps {
  checkboxSize?: Size
  selectedItemsNumber: number
  allItemsSelected?: boolean
  message: Message
  buttons?: ReactElement[]
  enlarged?: boolean
  onToggle?: (e?: ChangeEvent) => void
}

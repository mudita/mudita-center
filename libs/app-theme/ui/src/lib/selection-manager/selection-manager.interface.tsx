/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent, ReactElement } from "react"
import { CheckboxSize } from "app-theme/models"
import { Messages } from "app-localize/utils"

export interface SelectionManagerProps {
  checkboxSize?: CheckboxSize
  selectedItemsNumber: number
  allItemsSelected?: boolean
  message: Messages
  buttons?: ReactElement[]
  onToggle?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined
}

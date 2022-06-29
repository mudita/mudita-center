/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { Props } from "react-modal"
import { ModalProps } from "App/__deprecated__/renderer/components/core/modal/modal.component"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { Theme } from "App/__deprecated__/renderer/styles/theming/theme"

export interface ModalDialogProps extends Omit<Props, "isOpen">, ModalProps {
  close?: ComponentProps<typeof Button>
  closeModal?: () => void
  theme?: Theme
  open: boolean
  zIndex?: number
}

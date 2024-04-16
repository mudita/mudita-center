/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { Props } from "react-modal"
import { ModalProps } from "Core/__deprecated__/renderer/components/core/modal/modal.component"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { GetModalDialogStyleProps } from "Core/ui/components/modal-dialog/get-modal-dialog-style.helper"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

export interface ModalDialogProps extends Omit<Props, "isOpen">, ModalProps {
  close?: ComponentProps<typeof Button>
  closeModal?: () => void
  open: boolean
  theme?: GetModalDialogStyleProps["theme"]
  layer?: ModalLayers
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModalProps } from "Core/overview/components/update-os-modals/os-update-modal/os-update-modal.interface"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const OSUpdateModal: FunctionComponent<OSUpdateModalProps> = ({
  children,
  ...props
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    closeable
    closeButton={false}
    actionButtonSize={Size.FixedSmall}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

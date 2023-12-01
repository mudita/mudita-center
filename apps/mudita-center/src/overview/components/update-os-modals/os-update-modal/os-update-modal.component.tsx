/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OSUpdateModalProps } from "App/overview/components/update-os-modals/os-update-modal/os-update-modal.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
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

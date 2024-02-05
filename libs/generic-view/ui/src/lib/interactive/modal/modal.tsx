/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { BaseGenericComponent, ModalAction } from "generic-view/utils"
import styled from "styled-components"
import { ButtonBase } from "../../buttons/button-base/button-base"
import { useModalsQueue } from "./use-modals-queue"
import { withData } from "../../utils/with-data"
import { withConfig } from "../../utils/with-config"
import { ModalCloseIcon, ModalBase, ModalHeader } from "./modal-base"
import { iconButtonStyles } from "../../shared/button"

interface Config {
  closeButtonAction?: ModalAction
  width?: string | number
  variant?: "default" | "small"
}

export const Modal: BaseGenericComponent<
  undefined,
  Config,
  { componentKey: string }
> = ({ children, componentKey, config }) => {
  const { opened } = useModalsQueue(componentKey)

  const closeAction: ModalAction = config?.closeButtonAction
    ? config.closeButtonAction
    : { type: "close-modal", modalKey: componentKey }

  return (
    <ModalBase opened={opened} variant={config?.variant}>
      <ModalHeader>
        <ModalClose action={closeAction} test-id={"close-button"}>
          <ModalCloseIcon />
        </ModalClose>
      </ModalHeader>
      {children}
    </ModalBase>
  )
}

export default withConfig(withData(Modal))

const ModalClose = styled(ButtonBase)`
  ${iconButtonStyles};
`

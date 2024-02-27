/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { BaseGenericComponent, ModalAction } from "generic-view/utils"
import { useModalsQueue } from "./use-modals-queue"
import { withData } from "../../utils/with-data"
import { withConfig } from "../../utils/with-config"
import { ModalBase } from "./modal-base"
import { ModalCloseButton } from "./modal-helpers"

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

  return (
    <ModalBase opened={opened} variant={config?.variant}>
      {config?.closeButtonAction && (
        <ModalCloseButton action={config.closeButtonAction} />
      )}
      {children}
    </ModalBase>
  )
}

export default withConfig(withData(Modal))

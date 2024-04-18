/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  BaseGenericComponent,
  CustomAction,
  ModalAction,
} from "generic-view/utils"
import { useModalsQueue } from "./use-modals-queue"
import { withData } from "../../utils/with-data"
import { withConfig } from "../../utils/with-config"
import { ModalBase, ModalBaseConfig } from "./modal-base"
import { ModalButtons } from "./helpers/modal-buttons"
import { ModalCloseButton } from "./helpers/modal-close-button"
import { ModalSizeController } from "./helpers/modal-size-controller"
import { ModalTitle } from "./helpers/modal-title"
import { ModalTitleIcon } from "./helpers/modal-title-icon"
import { ModalScrollableContent } from "./helpers/modal-scrollable-content"
import { ModalContent, ModalSize } from "./helpers/modal-content"

interface Config extends ModalBaseConfig {
  closeButtonAction?: ModalAction | CustomAction
  size?: ModalSize
  defaultOpened?: boolean
  overlayHidden?: boolean
}

export const Modal: BaseGenericComponent<
  undefined,
  Config,
  { componentKey: string }
> & {
  TitleIcon: typeof ModalTitleIcon
  Title: typeof ModalTitle
  ScrollableContent: typeof ModalScrollableContent
  Buttons: typeof ModalButtons
  CloseButton: typeof ModalCloseButton
  SizeController: typeof ModalSizeController
} = ({ children, componentKey, config }) => {
  const { opened } = useModalsQueue(componentKey)

  return (
    <ModalBase
      overlayHidden={config?.overlayHidden}
      opened={Boolean(opened || config?.defaultOpened)}
      size={config?.size}
      config={{
        width: config?.width,
        maxHeight: config?.maxHeight,
        padding: config?.padding,
        gap: config?.gap,
      }}
    >
      {config?.closeButtonAction && (
        <ModalCloseButton config={{ action: config.closeButtonAction }} />
      )}
      <ModalContent>{children}</ModalContent>
    </ModalBase>
  )
}

Modal.TitleIcon = ModalTitleIcon
Modal.Title = ModalTitle
Modal.ScrollableContent = ModalScrollableContent
Modal.Buttons = ModalButtons
Modal.CloseButton = ModalCloseButton
Modal.SizeController = ModalSizeController

export default withConfig(withData(Modal)) as typeof Modal

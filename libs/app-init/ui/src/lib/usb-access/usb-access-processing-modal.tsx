/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { formatMessage } from "app-localize/utils"
import { Modal } from "app-theme/ui"
import { IconType, ModalLayer, ModalSize } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "general.usbAccess.processingModal.title",
  },
})

interface Props {
  opened: boolean
}

export const UsbAccessProcessingModal: FunctionComponent<Props> = ({
  opened,
}) => {
  return (
    <Modal opened={opened} layer={ModalLayer.UsbAccess} size={ModalSize.Small}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
    </Modal>
  )
}

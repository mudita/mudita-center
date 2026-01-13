/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages } from "react-intl"
import { IconType, ModalLayer, ModalSize } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { Modal } from "app-theme/ui"

const messages = defineMessages({
  downloadingTitle: { id: "general.contactSupport.downloadingTitle.title" },
})

interface Props {
  opened: boolean
}

export const ContactSupportDownloadingLogsModal: FunctionComponent<Props> = ({
  opened,
}) => {
  return (
    <Modal
      opened={opened}
      layer={ModalLayer.ContactSupport}
      size={ModalSize.Small}
    >
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{formatMessage(messages.downloadingTitle)}</Modal.Title>
    </Modal>
  )
}

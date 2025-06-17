/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

interface Props {
  opened: boolean
}

const messages = defineMessages({
  title: {
    id: "general.components.deviceConnecting.modal.title",
  },
})

export const DeviceConnectingModal: FunctionComponent<Props> = ({ opened }) => {
  return (
    <Modal opened={opened}>
      <Modal.TitleIcon type={IconType.Spinner} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
    </Modal>
  )
}

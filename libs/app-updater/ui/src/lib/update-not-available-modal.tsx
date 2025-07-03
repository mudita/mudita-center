/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Modal, Typography } from "app-theme/ui"
import { IconType } from "app-theme/models"
import { FunctionComponent } from "react"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "general.appUpdate.notAvailableModal.title",
  },
  description: {
    id: "general.appUpdate.notAvailableModal.description",
  },
})

interface Props {
  opened: boolean
  onClose?: () => void
}

export const UpdateNotAvailableModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title)}</Modal.Title>
      <Typography.P1>{formatMessage(messages.description)}</Typography.P1>
    </Modal>
  )
}

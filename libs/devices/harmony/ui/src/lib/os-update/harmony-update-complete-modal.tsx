/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "harmony.overview.os.update.modal.complete.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.complete.description",
  },
  closeButton: {
    id: "general.app.doneButton.text",
  },
})

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const HarmonyUpdateCompleteModal: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.CheckCircle} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onClose}
          message={messages.closeButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}

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
    id: "harmony.overview.os.update.modal.failed.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.failed.description",
  },
  helpButton: {
    id: "harmony.overview.os.update.modal.failed.helpButton",
  },
  contactSupportButton: {
    id: "harmony.overview.os.update.modal.failed.contactSupportButton",
  },
})

interface Props {
  opened: boolean
  onContactSupport: VoidFunction
  onGoToHelp: VoidFunction
  onClose: VoidFunction
}

export const HarmonyUpdateFailedModal: FunctionComponent<Props> = ({
  opened,
  onContactSupport,
  onGoToHelp,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Failed} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1 message={messages.description.id} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onContactSupport}
          message={messages.contactSupportButton.id}
        />
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onGoToHelp}
          message={messages.helpButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}

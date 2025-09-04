/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, ProgressBar, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  title: {
    id: "harmony.overview.os.update.modal.installing.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.installing.description",
  },
  cancelButton: {
    id: "harmony.overview.os.update.modal.installing.cancelButton",
  },
})

interface Props {
  opened: boolean
  progress?: number
  onCancel: VoidFunction
}

export const HarmonyUpdateInstallingModal: FunctionComponent<Props> = ({
  opened,
  progress = 0,
  onCancel,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onCancel} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1 message={messages.description.id} />
      <ProgressBar value={progress} />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onCancel}
          message={messages.cancelButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}

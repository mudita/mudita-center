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
    id: "harmony.overview.os.update.modal.downloaded.title",
  },
  description: {
    id: "harmony.overview.os.update.modal.downloaded.description",
  },
  updateButton: {
    id: "harmony.overview.os.update.modal.downloaded.updateButton",
  },
})

interface Props {
  opened: boolean
  newVersion: string
  onUpdate: VoidFunction
  onClose: VoidFunction
}

export const HarmonyUpdateDownloadedModal: FunctionComponent<Props> = ({
  opened,
  newVersion,
  onUpdate,
  onClose,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title text={formatMessage(messages.title)} />
      <Typography.P1
        message={messages.description.id}
        values={{
          version: newVersion,
        }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onUpdate}
          message={messages.updateButton.id}
        />
      </Modal.Buttons>
    </Modal>
  )
}

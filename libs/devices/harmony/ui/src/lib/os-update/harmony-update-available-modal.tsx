/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"

interface Props {
  opened: boolean
  newVersion: string
  downloadRequired?: boolean
  onUpdate: VoidFunction
  onDownload: VoidFunction
  onClose?: VoidFunction
  messages: {
    harmonyUpdateAvailableModalTitle: Messages
    harmonyUpdateAvailableModalDescription: Messages
    harmonyUpdateAvailableModalDownloadButton: Messages
    harmonyUpdateAvailableModalUpdateButton: Messages
  }
}

export const HarmonyUpdateAvailableModal: FunctionComponent<Props> = ({
  opened,
  newVersion,
  downloadRequired,
  onUpdate,
  onDownload,
  onClose,
  messages,
}) => {
  return (
    <Modal opened={opened}>
      {onClose && <Modal.CloseButton onClick={onClose} />}
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title
        text={formatMessage(messages.harmonyUpdateAvailableModalTitle)}
      />

      <Typography.P1
        message={messages.harmonyUpdateAvailableModalDescription.id}
        values={{ version: newVersion }}
      />

      <Modal.Buttons>
        {downloadRequired ? (
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={onDownload}
            message={messages.harmonyUpdateAvailableModalDownloadButton.id}
          />
        ) : (
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Medium}
            onClick={onUpdate}
            message={messages.harmonyUpdateAvailableModalUpdateButton.id}
          />
        )}
      </Modal.Buttons>
    </Modal>
  )
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"
import { ButtonType, IconType } from "app-theme/models"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.completeModal.title",
  },
  description: {
    id: "apiDevice.contacts.import.completeModal.description",
  },
  duplicatesDetected: {
    id: "apiDevice.contacts.import.completeModal.duplicatesDetected",
  },
  noDuplicatesDetected: {
    id: "apiDevice.contacts.import.completeModal.noDuplicatesDetected",
  },
  manageDuplicatesButton: {
    id: "apiDevice.contacts.import.completeModal.manageDuplicatesButton",
  },
  closeButtonText: {
    id: "general.app.closeButton.text",
  },
})

interface Props {
  opened: boolean
  contactsCount: number
  duplicatesCount?: number
  onClose: VoidFunction
  onManageDuplicates: VoidFunction
}

export const ImportCompleteModal: FunctionComponent<Props> = ({
  opened,
  contactsCount,
  duplicatesCount = 0,
  onClose,
  onManageDuplicates,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Confirm} />
      <Modal.Title message={messages.title.id} />
      <div>
        <Typography.P1
          message={messages.description.id}
          values={{ count: contactsCount }}
        />
        <Typography.P1
          message={
            duplicatesCount > 0
              ? messages.duplicatesDetected.id
              : messages.noDuplicatesDetected.id
          }
          values={{ count: duplicatesCount }}
        />
      </div>
      {duplicatesCount > 0 ? (
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            onClick={onClose}
            message={messages.closeButtonText.id}
          />
          <Button
            type={ButtonType.Primary}
            onClick={onManageDuplicates}
            message={messages.manageDuplicatesButton.id}
          />
        </Modal.Buttons>
      ) : (
        <Modal.Buttons>
          <Button
            type={ButtonType.Secondary}
            onClick={onClose}
            message={messages.closeButtonText.id}
          />
        </Modal.Buttons>
      )}
    </Modal>
  )
}

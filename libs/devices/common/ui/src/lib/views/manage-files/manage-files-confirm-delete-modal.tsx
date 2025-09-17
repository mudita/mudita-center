/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage, Messages } from "app-localize/utils"

export interface ManageFilesConfirmDeleteModalProps {
  opened: boolean
  onSecondaryButtonClick: VoidFunction
  onPrimaryButtonClick: VoidFunction
  onClose: VoidFunction
  selectedItems: number
  messages: {
    title: Messages
    description: Messages
    primaryButtonText: Messages
    secondaryButtonText: Messages
  }
}

export const ManageFilesConfirmDeleteModal: FunctionComponent<
  ManageFilesConfirmDeleteModalProps
> = ({
  opened,
  onSecondaryButtonClick,
  onPrimaryButtonClick,
  onClose,
  selectedItems,
  messages,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title text={formatMessage(messages.title, { selectedItems })} />
      <Typography.P1
        message={messages.description.id}
        values={{ selectedItems }}
      />
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onSecondaryButtonClick}
          message={messages.secondaryButtonText.id}
          values={{ selectedItems }}
        />
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onPrimaryButtonClick}
          message={messages.primaryButtonText.id}
          values={{ selectedItems }}
        />
      </Modal.Buttons>
    </Modal>
  )
}

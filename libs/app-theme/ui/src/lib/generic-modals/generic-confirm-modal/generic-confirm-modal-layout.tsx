/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { ButtonSize, ButtonType, IconType } from "app-theme/models"
import { formatMessage } from "app-localize/utils"
import { Modal } from "../../modal/modal"
import { Typography } from "../../typography/typography"
import { Button } from "../../button/button"
import { GenericConfirmModalProps } from "./generic-confirm-modal.types"

export const GenericConfirmModalLayout: FunctionComponent<
  GenericConfirmModalProps
> = ({
  opened,
  onCancel,
  onConfirm,
  itemCount,
  messages,
  confirmDisabled,
  children,
}) => {
  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onCancel} />
      <Modal.TitleIcon type={IconType.Error} />
      <Modal.Title
        text={formatMessage(messages.confirmModalTitle, {
          itemCount,
        })}
      />
      <Typography.P1
        message={messages.confirmModalDescription.id}
        values={{ itemCount }}
      />
      {children}
      <Modal.Buttons>
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Medium}
          onClick={onCancel}
        >
          {formatMessage(
            messages.confirmModalCancelButtonText ?? {
              id: "general.app.cancelButton.text",
            }
          )}
        </Button>
        <Button
          type={ButtonType.Primary}
          size={ButtonSize.Medium}
          onClick={onConfirm}
          disabled={confirmDisabled}
        >
          {formatMessage(messages.confirmModalConfirmButtonText, {
            itemCount,
          })}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}

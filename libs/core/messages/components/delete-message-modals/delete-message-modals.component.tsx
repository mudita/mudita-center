/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeleteMessageModalsTestIds } from "Core/messages/components/delete-message-modals/delete-message-modals-test-ids.enum"
import { DeleteMessageModalProps } from "Core/messages/components/delete-message-modals/delete-message-modals.interface"
import { DeleteConfirmationModal } from "Core/ui/components/delete-confirmation-modal"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import InfoPopup from "Core/ui/components/info-popup/info-popup.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  deletedMessageInfo: { id: "module.messages.deletedMessageInfo" },
  deleteModalTitle: { id: "module.messages.deleteMessageModalTitle" },
  deleteModalBody: { id: "module.messages.deleteMessageModalBody" },
  deleteModalCancel: { id: "module.messages.deleteMessageModalCancel" },
  deleteModalAction: { id: "module.messages.deleteMessageModalAction" },
  deletingModalTitle: { id: "module.messages.deletingMessageModalTitle" },
  deletingModalSubtitle: { id: "module.messages.deletingMessageModalSubtitle" },
  deleteModalErrorTitle: { id: "module.messages.deleteMessageModalErrorTitle" },
  deleteModalErrorSubtitle: {
    id: "module.messages.deleteMessageModalErrorSubtitle",
  },
})

const DeleteMessageModals: FunctionComponent<DeleteMessageModalProps> = ({
  error,
  deleting,
  deletingInfo,
  deletingConfirmation,
  onDelete,
  onCloseDeletingModal,
  onCloseDeletingErrorModal,
}) => {
  return (
    <div data-testid={DeleteMessageModalsTestIds.DeleteMessageModalsContainer}>
      {deletingConfirmation && (
        <DeleteConfirmationModal
          testId={DeleteMessageModalsTestIds.DeleteMessageConfirmation}
          open={deletingConfirmation}
          titleLabel={intl.formatMessage(messages.deleteModalTitle)}
          info={messages.deleteModalBody}
          onActionButtonClick={onDelete}
          onCloseButton={onCloseDeletingModal}
          cancelButtonLabel={intl.formatMessage(messages.deleteModalCancel)}
          actionButtonLabel={intl.formatMessage(messages.deleteModalAction)}
        />
      )}
      {deletingInfo && (
        <InfoPopup
          testId={DeleteMessageModalsTestIds.SuccessMessageDelete}
          message={messages.deletedMessageInfo}
        />
      )}
      {deleting && error !== null && (
        <ErrorModal
          testId={DeleteMessageModalsTestIds.FailMessageDelete}
          open={deleting && error !== null}
          title={intl.formatMessage(messages.deleteModalErrorTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={onCloseDeletingErrorModal}
        />
      )}
    </div>
  )
}

export default DeleteMessageModals

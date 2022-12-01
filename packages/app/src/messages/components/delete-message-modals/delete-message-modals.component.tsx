/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeleteMessageModalsTestIds } from "App/messages/components/delete-message-modals/delete-message-modals-test-ids.enum"
import { DeleteMessageModalProps } from "App/messages/components/delete-message-modals/delete-message-modals.interface"
import { DeleteConfirmationModal } from "App/ui/components/delete-confirmation-modal"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"

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
    <>
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
          message={messages.deletedMessageInfo}
          testId={DeleteMessageModalsTestIds.SuccessMessageDelete}
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
    </>
  )
}

export default DeleteMessageModals

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeleteMessageModalsTestIds } from "App/messages/components/delete-message-modals/delete-message-modals.enum"
import { MessageDeletingState } from "App/messages/constants"
import { DeleteConfirmationModal } from "App/ui/components/delete-confirmation-modal"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

interface Props {
  messageDeletingState: MessageDeletingState | null
  openDeleteMessageConfirmation: boolean
  onMessageRemove: () => void
  hideConfirmationModal: () => void
  hideDeleteErrorModal: () => void
}

const messages = defineMessages({
  deleteMessageModalTitle: {
    id: "module.messages.deleteMessageModalTitle",
  },
  deleteMessageConfirmationModalBody: {
    id: "module.messages.deleteMessageConfirmationModalBody",
  },
  deleteMessageConfirmationModalCancel: {
    id: "module.messages.deleteMessageConfirmationModalCancel",
  },
  deleteMessageConfirmationModalDelete: {
    id: "module.messages.deleteMessageConfirmationModalDelete",
  },

  deleteMessageSuccessPopupInfo: {
    id: "module.messages.deleteMessageSuccessPopupInfo",
  },

  deleteMessageFailureModalSubtitle: {
    id: "module.messages.deleteMessageFailureModalSubtitle",
  },
})

const DeleteMessageModals: FunctionComponent<Props> = ({
  messageDeletingState,
  openDeleteMessageConfirmation,
  onMessageRemove,
  hideDeleteErrorModal,
  hideConfirmationModal,
}) => {
  return (
    <>
      {openDeleteMessageConfirmation && (
        <DeleteConfirmationModal
          testId={DeleteMessageModalsTestIds.DeleteMessageConfirmation}
          open={openDeleteMessageConfirmation}
          info={messages.deleteMessageConfirmationModalBody}
          onActionButtonClick={onMessageRemove}
          onCloseButton={hideConfirmationModal}
          cancelButtonLabel={intl.formatMessage(
            messages.deleteMessageConfirmationModalCancel
          )}
          actionButtonLabel={intl.formatMessage(
            messages.deleteMessageConfirmationModalDelete
          )}
          titleLabel={intl.formatMessage(messages.deleteMessageModalTitle)}
        />
      )}

      {messageDeletingState === MessageDeletingState.Success && (
        <InfoPopup
          message={messages.deleteMessageSuccessPopupInfo}
          testId={DeleteMessageModalsTestIds.SuccessMessageDelete}
        />
      )}
      {messageDeletingState === MessageDeletingState.Fail && (
        <ErrorModal
          testId={DeleteMessageModalsTestIds.FailMessageDelete}
          open={messageDeletingState === MessageDeletingState.Fail}
          title={intl.formatMessage(messages.deleteMessageModalTitle)}
          subtitle={intl.formatMessage(
            messages.deleteMessageFailureModalSubtitle
          )}
          closeModal={hideDeleteErrorModal}
        />
      )}
    </>
  )
}

export default DeleteMessageModals

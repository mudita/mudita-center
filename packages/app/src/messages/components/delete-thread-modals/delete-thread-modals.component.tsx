/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeleteThreadModalsTestIds } from "App/messages/components/delete-thread-modals/delete-thread-modals-test-ids.enum"
import { DeleteThreadModalProps } from "App/messages/components/delete-thread-modals/delete-thread-modals.interface"
import { DeleteConfirmationModal } from "App/ui/components/delete-confirmation-modal"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  deletedThread: { id: "module.messages.deletedThread" },
  deletedThreads: { id: "module.messages.deletedThreads" },
  deleteModalTitle: { id: "module.messages.deleteThreadModalTitle" },
  deleteModalBody: { id: "module.messages.deleteThreadModalBody" },
  deleteModalCancel: { id: "module.messages.deleteThreadModalCancel" },
  deleteModalAction: { id: "module.messages.deleteThreadModalAction" },
  deletingModalTitle: { id: "module.messages.deletingThreadModalTitle" },
  deletingModalSubtitle: { id: "module.messages.deletingThreadModalSubtitle" },
  deleteModalErrorTitle: { id: "module.messages.deleteThreadModalErrorTitle" },
  deleteModalErrorSubtitle: {
    id: "module.messages.deleteThreadModalErrorSubtitle",
  },
})

export const DeleteThreadModals: FunctionComponent<DeleteThreadModalProps> = ({
  error,
  deletingConfirmation,
  deleting,
  deletedThreads,
  onCloseDeletingErrorModal,
  onDelete,
  onCloseDeletingModal,
}) => {
  return (
    <>
      {deletingConfirmation && (
        <DeleteConfirmationModal
          testId={DeleteThreadModalsTestIds.ConfirmationModal}
          open={deletingConfirmation}
          info={{
            ...messages.deleteModalBody,
            values: { ...textFormatters, num: deletedThreads.length },
          }}
          titleLabel={intl.formatMessage(messages.deleteModalTitle)}
          onActionButtonClick={onDelete}
          onCloseButton={onCloseDeletingModal}
          cancelButtonLabel={intl.formatMessage(messages.deleteModalCancel)}
          actionButtonLabel={intl.formatMessage(messages.deleteModalAction)}
        />
      )}
      {deleting && !error && (
        <LoaderModal
          testId={DeleteThreadModalsTestIds.LoadingModal}
          open={deleting}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {deleting && error !== null && (
        <ErrorModal
          testId={DeleteThreadModalsTestIds.ErrorModal}
          open={deleting && error !== null}
          title={intl.formatMessage(messages.deleteModalErrorTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={onCloseDeletingErrorModal}
        />
      )}
    </>
  )
}

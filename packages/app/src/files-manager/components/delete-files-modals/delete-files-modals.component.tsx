/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { DeleteFilesModalsTestIds } from "App/files-manager/components/delete-files-modals/delete-files-modals-test-ids.enum"
import { DeleteFilesModalProps } from "App/files-manager/components/delete-files-modals/delete-files-modals.interface"
import { DeleteConfirmationModal } from "App/ui/components/delete-confirmation-modal"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"

const messages = defineMessages({
  deletedInfo: { id: "module.filesManager.deletePopup" },
  deleteModalTitle: { id: "module.filesManager.deleteFileModalTitle" },
  deleteModalBody: { id: "module.filesManager.deleteFileModalBody" },
  deleteModalCancel: { id: "module.filesManager.deleteFileModalCancel" },
  deleteModalAction: { id: "module.filesManager.deleteFileModalAction" },
  deletingModalTitle: { id: "module.messages.deletingThreadModalTitle" },
  deletingModalSubtitle: { id: "module.messages.deletingThreadModalSubtitle" },
  deleteModalErrorTitle: { id: "module.messages.deleteThreadModalErrorTitle" },
  deleteModalErrorSubtitle: {
    id: "module.messages.deleteThreadModalErrorSubtitle",
  },
})

export const DeleteFilesModals: FunctionComponent<DeleteFilesModalProps> = ({
  error,
  deletingConfirmation,
  deleting,
  deletingInfo,
  deletedFilesLength,
  onCloseDeletingErrorModal,
  onDelete,
  onCloseDeletingModal,
}) => {
  return (
    <>
      {deletingConfirmation && (
        <DeleteConfirmationModal
          testId={DeleteFilesModalsTestIds.ConfirmationModal}
          open={deletingConfirmation}
          info={{
            ...messages.deleteModalBody,
            values: { ...textFormatters, num: deletedFilesLength },
          }}
          titleLabel={intl.formatMessage(messages.deleteModalTitle)}
          onActionButtonClick={onDelete}
          onCloseButton={onCloseDeletingModal}
          cancelButtonLabel={intl.formatMessage(messages.deleteModalCancel)}
          actionButtonLabel={intl.formatMessage(messages.deleteModalAction)}
        />
      )}

      {deletingInfo && (
        <InfoPopup
          message={{
            ...messages.deletedInfo,
            values: { ...textFormatters, num: deletedFilesLength },
          }}
          testId={DeleteFilesModalsTestIds.DeletedPopUp}
        />
      )}
      {deleting && !error && (
        <LoaderModal
          testId={DeleteFilesModalsTestIds.LoadingModal}
          open={deleting}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {deleting && error !== null && (
        <ErrorModal
          testId={DeleteFilesModalsTestIds.ErrorModal}
          open={deleting && error !== null}
          title={intl.formatMessage(messages.deleteModalErrorTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={onCloseDeletingErrorModal}
        />
      )}
    </>
  )
}

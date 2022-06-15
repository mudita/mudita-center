/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { DeletingTemplateModalsProps } from "App/templates/components/deleting-template-modals/deleting-template-modals.interface"
import { defineMessages } from "react-intl"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { DeleteConfirmationModal } from "App/templates/components/delete-confirmation-modal"
import { DeletingTemplateModalsTestIds } from "App/templates/components/deleting-template-modals/deleting-template-modals-test-ids.enum"

const messages = defineMessages({
  deleteModalTitle: { id: "module.templates.deleteModalTitle" },
  deleteModalBody: { id: "module.templates.deleteModalBody" },
  templateDeleted: { id: "module.templates.templateDelete" },
  templatesDeleted: { id: "module.templates.templatesDelete" },
  deletingModalTitle: { id: "module.templates.deletingModalTitle" },
  deletingModalSubtitle: { id: "module.templates.deletingModalSubtitle" },
  deleteModalErrorSubtitle: { id: "module.templates.deleteModalErrorSubtitle" },
})

const getDeletedTemplateText = (
  deletedTemplatesLength: number
): TranslationMessage => {
  if (deletedTemplatesLength === 1) {
    return {
      ...messages.templateDeleted,
    }
  } else {
    return {
      ...messages.templatesDeleted,
      values: {
        number: deletedTemplatesLength,
      },
    }
  }
}

export const DeletingTemplateModals: FunctionComponent<
  DeletingTemplateModalsProps
> = ({
  deletedTemplatesLength,
  error,
  deletingInfo,
  deleting,
  deletingConfirmation,
  onCloseDeletingErrorModal,
  onDelete,
  onCloseDeletingModal,
}) => {
  return (
    <>
      {deletingConfirmation && (
        <DeleteConfirmationModal
          testId={DeletingTemplateModalsTestIds.ConfirmationModal}
          open={deletingConfirmation}
          info={{
            ...messages.deleteModalBody,
            values: { ...textFormatters, num: deletedTemplatesLength },
          }}
          onActionButtonClick={onDelete}
          onCloseButton={onCloseDeletingModal}
        />
      )}

      {/* TODO: connect to global notification state */}
      {deletingInfo && (
        <InfoPopup
          testId={DeletingTemplateModalsTestIds.DeletedPopUp}
          message={getDeletedTemplateText(deletedTemplatesLength)}
        />
      )}
      {deleting && !error && (
        <LoaderModal
          testId={DeletingTemplateModalsTestIds.LoadingModal}
          open={deleting}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {deleting && error !== null && (
        <ErrorModal
          testId={DeletingTemplateModalsTestIds.ErrorModal}
          open={deleting && error !== null}
          title={intl.formatMessage(messages.deleteModalTitle)}
          subtitle={intl.formatMessage(messages.deleteModalErrorSubtitle)}
          closeModal={onCloseDeletingErrorModal}
        />
      )}
    </>
  )
}

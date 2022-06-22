/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeleteThreadModalsTestIds } from "App/messages/components/delete-thread-modals/delete-thread-modals.enum"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { Message as TranslationMessage } from "App/__deprecated__/renderer/interfaces/message.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"
import { ThreadDeletingState } from "../../constants"

interface Props {
  threadDeletingState: ThreadDeletingState | null
  deletedThreads: string[]
  hideDeleteModal: () => void
}

const messages = defineMessages({
  deleteModalTitle: { id: "module.messages.deleteModalTitle" },
  deletingModalTitle: { id: "module.messages.deletingModalTitle" },
  deletingModalSubtitle: { id: "module.messages.deletingModalSubtitle" },
  deletingModalErrorSubtitle: {
    id: "module.messages.deleteModalErrorSubtitle",
  },
  conversationDeleted: {
    id: "module.messages.conversationDelete",
  },
  conversationsDeleted: {
    id: "module.messages.conversationsDelete",
  },
})

const DeleteThreadModals: FunctionComponent<Props> = ({
  threadDeletingState,
  deletedThreads,
  hideDeleteModal,
}) => {
  const getDeletedThreadText = (
    deletedThreadsLength: number
  ): TranslationMessage => {
    if (deletedThreadsLength === 1) {
      return {
        ...messages.conversationDeleted,
      }
    } else {
      return {
        ...messages.conversationsDeleted,
        values: {
          number: deletedThreadsLength,
        },
      }
    }
  }

  return (
    <>
      {threadDeletingState === ThreadDeletingState.Success && (
        <InfoPopup
          message={getDeletedThreadText(deletedThreads.length)}
          testId={DeleteThreadModalsTestIds.SuccessThreadDelete}
        />
      )}
      {threadDeletingState === ThreadDeletingState.Deleting && (
        <LoaderModal
          testId={DeleteThreadModalsTestIds.ThreadDeleting}
          open={threadDeletingState === ThreadDeletingState.Deleting}
          title={intl.formatMessage(messages.deletingModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalSubtitle)}
        />
      )}
      {threadDeletingState === ThreadDeletingState.Fail && (
        <ErrorModal
          testId={DeleteThreadModalsTestIds.FailThreadDelete}
          open={threadDeletingState === ThreadDeletingState.Fail}
          title={intl.formatMessage(messages.deleteModalTitle)}
          subtitle={intl.formatMessage(messages.deletingModalErrorSubtitle)}
          closeModal={hideDeleteModal}
        />
      )}
    </>
  )
}

export default DeleteThreadModals

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import assert from "assert"
import { useEffect, useState } from "react"

interface Props
  extends Pick<MessagesProps, "state" | "error" | "deleteMessage"> {
  messagesState: MessagesState
  searchMessagesBySavedSearchQuery: () => void
}

interface UseMessageDeleteHook {
  messageDeletingConfirmation: boolean
  messageDeleting: boolean
  messageDeletingInfo: boolean
  openDeleteMessageModal: (messageId: string) => void
  hideDeleteMessageConfirmationModal: () => void
  hideDeleteMessageErrorModal: () => void
  deleteAssignedMessage: () => void
}

export const useMessageDelete = ({
  deleteMessage,
  state,
  error,
  messagesState,
  searchMessagesBySavedSearchQuery,
}: Props): UseMessageDeleteHook => {
  const [messageToDelete, setMessageToDelete] = useState<string | undefined>()
  const [messageDeletingConfirmation, setMessageDeletingConfirmation] =
    useState(false)
  const [messageDeleting, setMessageDeleting] = useState(false)
  const [messageDeletingInfo, setMessageDeletingInfo] = useState(false)

  const deleteAssignedMessage = () => {
    assert(messageToDelete)
    void deleteMessage(messageToDelete)
    setMessageToDelete(undefined)

    setMessageDeletingConfirmation(false)
    setMessageDeleting(true)
  }

  const hideDeleteMessageConfirmationModal = () => {
    setMessageToDelete(undefined)
    setMessageDeletingConfirmation(false)
  }

  const hideDeleteMessageErrorModal = () => {
    setMessageDeleting(false)
  }

  const openDeleteMessageModal = (messageId: string) => {
    setMessageToDelete(messageId)
    setMessageDeletingConfirmation(true)
  }

  useEffect(() => {
    if (state !== State.Loaded) {
      return
    }

    const handleDeletingStateTimeout = setTimeout(() => {
      if (messageDeleting) {
        setMessageDeleting(false)
        setMessageDeletingConfirmation(false)
        setMessageDeletingInfo(true)
        messagesState === MessagesState.SearchResult &&
          searchMessagesBySavedSearchQuery()
      }
    }, 1000)

    const hideInfoPopupsTimeout = setTimeout(() => {
      setMessageDeletingInfo(false)
    }, 5000)

    return () => {
      clearTimeout(handleDeletingStateTimeout)
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, error])

  return {
    messageDeletingConfirmation,
    messageDeleting,
    messageDeletingInfo,
    openDeleteMessageModal,
    hideDeleteMessageConfirmationModal,
    hideDeleteMessageErrorModal,
    deleteAssignedMessage,
  }
}

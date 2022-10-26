/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { mockThread } from "App/messages/components/messages/messages.new-thread.const"
import { Thread } from "App/messages/dto"
import { useEffect, useState } from "react"

interface Props
  extends Pick<
    MessagesProps,
    "deleteThreads" | "resetItems" | "state" | "error" | "selectedItems"
  > {
  setActiveThread: (thread: Thread | undefined) => void
  messagesState: MessagesState
  tmpActiveThread: Thread | undefined
  activeThread: Thread | undefined
  closeSidebars: () => void
  setMessagesState: (state: MessagesState) => void
}

interface UseThreadDeleteHook {
  deletedThreads: string[]
  threadDeletingConfirmation: boolean
  threadDeleting: boolean
  threadDeletingInfo: boolean
  hideDeleteThreadConfirmationModal: () => void
  hideDeleteThreadErrorModal: () => void
  deleteConfirmedThreads: () => Promise<void>
  setSelectedForsForDeletion: () => void
  setActiveThreadForDeletion: () => void
  setThreadForDeletion: (id: string) => void
}

export const useThreadDelete = ({
  deleteThreads,
  resetItems,
  setActiveThread,
  messagesState,
  state,
  error,
  selectedItems,
  tmpActiveThread,
  closeSidebars,
  activeThread,
  setMessagesState,
}: Props): UseThreadDeleteHook => {
  const [threadDeletingConfirmation, setThreadDeletingConfirmation] =
    useState(false)
  const [threadDeleting, setThreadDeleting] = useState(false)
  const [deletedThreads, setDeletedThreads] = useState<string[]>([])
  const [threadDeletingInfo, setThreadDeletingInfo] = useState(false)

  useEffect(() => {
    if (state !== State.Loaded) {
      return
    }

    const handleDeletingStateTimeout = setTimeout(() => {
      if (threadDeleting) {
        setThreadDeleting(false)
        setThreadDeletingConfirmation(false)
        setThreadDeletingInfo(true)
      }
    }, 1000)

    const hideInfoPopupsTimeout = setTimeout(() => {
      setThreadDeletingInfo(false)
    }, 5000)

    return () => {
      clearTimeout(handleDeletingStateTimeout)
      clearTimeout(hideInfoPopupsTimeout)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, error])

  const hideDeleteThreadConfirmationModal = () => {
    setThreadDeletingConfirmation(false)
  }

  const hideDeleteThreadErrorModal = () => {
    setThreadDeleting(false)
  }

  const deleteConfirmedThreads = async (): Promise<void> => {
    setThreadDeletingConfirmation(false)
    setThreadDeleting(true)

    await deleteThreads(deletedThreads)
    resetItems()
    setActiveThread(undefined)
    if (messagesState === MessagesState.NewMessage) {
      setActiveThread(mockThread)
    }
  }

  const setSelectedForsForDeletion = (): void => {
    setDeletedThreads(selectedItems.rows)
    setThreadDeletingConfirmation(true)
  }

  const setThreadForDeletion = (id: string): void => {
    resetItems()
    setDeletedThreads([id])
    setThreadDeletingConfirmation(true)
  }

  const setActiveThreadForDeletion = (): void => {
    if (tmpActiveThread !== undefined) {
      closeSidebars()
    } else if (activeThread) {
      setThreadForDeletion(activeThread.id)
      setMessagesState(MessagesState.List)
      setActiveThread(undefined)
    }
  }

  return {
    deletedThreads,
    threadDeletingConfirmation,
    threadDeleting,
    threadDeletingInfo,
    hideDeleteThreadConfirmationModal,
    hideDeleteThreadErrorModal,
    deleteConfirmedThreads,
    setSelectedForsForDeletion,
    setActiveThreadForDeletion,
    setThreadForDeletion,
  }
}

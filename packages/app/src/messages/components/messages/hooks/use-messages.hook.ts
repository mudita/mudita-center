/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Feature, flags } from "App/feature-flags"
import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { isThreadNumberEqual } from "App/messages/components/messages/is-thread-number-equal.helper"
import { MessagesState } from "App/messages/components/messages/messages.enum"
import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { mockThread } from "App/messages/components/messages/messages.new-thread.const"
import { MessageType } from "App/messages/constants"
import { Message, Thread } from "App/messages/dto"
import { Receiver, ReceiverIdentification } from "App/messages/reducers"
import useURLSearchParams from "App/__deprecated__/renderer/utils/hooks/use-url-search-params"
import { useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"

type Props = Pick<
  MessagesProps,
  | "threads"
  | "selectedItems"
  | "updateMessage"
  | "deleteMessage"
  | "getThreadDraftMessageSelector"
  | "markThreadsReadStatus"
  | "resetItems"
  | "addNewMessage"
  | "getReceiver"
  | "selectAllItems"
>

interface UseMessagesHook {
  setContent: (content: string) => void
  content: string
  selectPhoneNumber: (phoneNumber: string) => void
  tmpActiveThread: Thread | undefined
  activeThread: Thread | undefined
  setActiveThread: (thread: Thread | undefined) => void
  messagesState: MessagesState
  setMessagesState: (state: MessagesState) => void
  closeSidebars: () => void
  openThreadDetails: (thread: Thread) => void
  openNewMessage: () => void
  allItemsSelected: boolean
  toggleAllCheckboxes: () => void
  getThreads: () => Thread[]
  selectThread: (thread: Thread, clearSearchCallback: () => void) => void
  getViewReceiver: (activeThread: Thread) => Receiver
  sendNewMessage: () => Promise<void>
  selectReceiver: (receiver: Pick<Receiver, "phoneNumber">) => void
}

export const useMessages = ({
  threads,
  selectedItems,
  updateMessage,
  deleteMessage,
  getThreadDraftMessageSelector,
  markThreadsReadStatus,
  resetItems,
  addNewMessage,
  getReceiver,
  selectAllItems,
}: Props): UseMessagesHook => {
  const [draftDeleting, setDraftDeleting] = useState(false)

  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()
  const [draftMessage, setDraftMessage] = useState<Message>()
  const [content, setContent] = useState("")

  const debouncedContent = useDebounce(content, 1000)
  const allItemsSelected = threads.length === selectedItems.rows.length

  useEffect(() => {
    handlePotentialThreadDeletion()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads])

  useEffect(() => {
    if (!activeThread) {
      return
    }

    const thread = threads.find(isThreadNumberEqual(activeThread.phoneNumber))

    if (tmpActiveThread === undefined && thread === undefined) {
      setActiveThread(undefined)
    }

    if (thread) {
      setActiveThread(thread)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThread, threads])

  useEffect(() => {
    if (!flags.get(Feature.MessagesDraftStatus)) {
      return
    }

    if (draftMessage) {
      if (content && content !== draftMessage.content) {
        void updateMessage({ ...draftMessage, content })
      }

      if (!content.length) {
        void deleteMessage(draftMessage.id)
        setDraftDeleting(true)
        setDraftMessage(undefined)
        setContent("")
      }
    } else {
      if (
        activeThread &&
        debouncedContent &&
        activeThread.phoneNumber !== mockThread.phoneNumber
      ) {
        void handleAddNewMessage(activeThread.phoneNumber, MessageType.DRAFT)
        setDraftDeleting(false)
      }
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent])

  useEffect(() => {
    if (!flags.get(Feature.MessagesDraftStatus)) {
      return
    }

    if (!activeThread || draftDeleting) {
      return
    }

    const tmpDraftMessage = getThreadDraftMessageSelector(activeThread.id)
    if (tmpDraftMessage) {
      setDraftMessage(tmpDraftMessage)
      setContent(tmpDraftMessage.content)
    } else {
      setDraftMessage(undefined)
    }
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThread, threads])

  const handlePotentialThreadDeletion = () => {
    const isThreadInThreadsList = (thread: Thread) => {
      return threads.find((item) => item.id === thread.id)
    }

    const isMockedThreadUsedForNewMessageForm = (thread: Thread) => {
      return thread.id === mockThread.id
    }

    if (
      activeThread &&
      !isMockedThreadUsedForNewMessageForm(activeThread) &&
      !isThreadInThreadsList(activeThread)
    ) {
      setMessagesState(MessagesState.List)
      setActiveThread(undefined)
    }
  }

  const openNewMessageForm = (): void => {
    setContent("")
    setActiveThread(mockThread)
    setTmpActiveThread(mockThread)
    setMessagesState(MessagesState.NewMessage)
  }

  const openThreadDetails = (thread: Thread): void => {
    setContent("")
    setActiveThread(thread)
    setTmpActiveThread(undefined)
    setMessagesState(MessagesState.ThreadDetails)
    resetItems()
  }

  const closeSidebars = (): void => {
    setContent("")
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    setDraftMessage(undefined)
    setDraftDeleting(false)
    setMessagesState(MessagesState.List)
  }

  const openNewMessage = (): void => {
    if (
      tmpActiveThread === undefined ||
      tmpActiveThread.phoneNumber !== mockThread.phoneNumber
    ) {
      openNewMessageForm()
    }
  }

  const selectThread = (
    thread: Thread,
    clearSearchCallback: () => void
  ): void => {
    if (activeThread?.id !== thread.id) {
      openThreadDetails(thread)
      clearSearchCallback()

      if (!thread.unread) {
        return
      }

      markThreadsReadStatus([thread])
    }
  }

  const handleAddNewMessage = async (
    phoneNumber: string,
    messageType = MessageType.OUTBOX
  ): Promise<void> => {
    if (draftMessage) {
      await deleteMessage(draftMessage.id)
      setDraftMessage(undefined)
    }

    const threadId = threads.find(isThreadNumberEqual(phoneNumber))?.id
    if (tmpActiveThread !== undefined) {
      selectReceiver({ phoneNumber })
    }
    const response = await addNewMessage({
      content,
      phoneNumber,
      threadId,
      messageType,
    })
    const thread = response.payload.messageParts[0].thread
    if (thread) {
      openThreadDetails(thread)
    }
    if (messageType === MessageType.OUTBOX) {
      setContent("")
    }
  }

  const sendNewMessage = async () => {
    if (!activeThread) {
      return
    }

    await handleAddNewMessage(activeThread.phoneNumber)
  }

  const selectReceiver = (receiver: Pick<Receiver, "phoneNumber">) => {
    if (!receiver) {
      return
    }
    const phoneNumber = receiver.phoneNumber

    const thread = threads.find(isThreadNumberEqual(phoneNumber))

    if (thread) {
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    } else {
      const tmpThread: Thread = {
        ...mockThread,
        phoneNumber,
      }
      setTmpActiveThread(tmpThread)
      setActiveThread(tmpThread)
      setMessagesState(MessagesState.ThreadDetails)
    }
  }

  const selectPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) {
      return
    }

    selectReceiver({ phoneNumber })
  }

  const getViewReceiver = (activeThread: Thread): Receiver => {
    if (activeThread.id === mockThread.id) {
      return {
        phoneNumber: activeThread.phoneNumber,
        identification: ReceiverIdentification.unknown,
      }
    }

    const receiver = getReceiver(activeThread.phoneNumber)

    if (receiver === undefined) {
      return {
        phoneNumber: "",
        identification: ReceiverIdentification.unknown,
      }
    } else {
      return receiver
    }
  }

  const getThreads = (): Thread[] => {
    if (tmpActiveThread !== undefined) {
      return [tmpActiveThread, ...threads]
    } else {
      return threads
    }
  }

  const toggleAllCheckboxes = () => {
    allItemsSelected ? resetItems() : selectAllItems()
  }

  return {
    setContent,
    content,
    selectPhoneNumber,
    tmpActiveThread,
    activeThread,
    setActiveThread,
    messagesState,
    setMessagesState,
    closeSidebars,
    openThreadDetails,
    openNewMessage,
    allItemsSelected,
    toggleAllCheckboxes,
    getThreads,
    selectThread,
    getViewReceiver,
    sendNewMessage,
    selectReceiver,
  }
}

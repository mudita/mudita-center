/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagesProps } from "App/messages/components/messages/messages.interface"
import { Thread } from "App/messages/dto"

interface Props
  extends Pick<
    MessagesProps,
    "toggleReadStatus" | "markThreadsReadStatus" | "resetItems"
  > {
  activeThread: Thread | undefined
  closeSidebars: () => void
}

interface UseReadStatusHook {
  markAsUnread: () => void
  markAsRead: () => void
  toggleThreadsReadStatus: (threads: Thread[]) => void
}

export const useReadStatus = ({
  activeThread,
  toggleReadStatus,
  resetItems,
  closeSidebars,
  markThreadsReadStatus,
}: Props): UseReadStatusHook => {
  const markAsUnread = (): void => {
    if (!activeThread || activeThread.unread) {
      return
    }

    toggleReadStatus([activeThread])
    resetItems()
    closeSidebars()
  }

  const markAsRead = (): void => {
    if (!activeThread) {
      return
    }

    if (!activeThread.unread) {
      return
    }

    markThreadsReadStatus([activeThread])
  }

  const toggleThreadsReadStatus = (threads: Thread[]) => {
    toggleReadStatus(threads)
    resetItems()
  }

  return {
    markAsUnread,
    markAsRead,
    toggleThreadsReadStatus,
  }
}

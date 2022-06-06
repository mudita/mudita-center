/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { MessagesState, Thread } from "App/messages/reducers/messages.interface"

export interface Content {
  id: string
  text: string
}

export type ComponentProps = Pick<
  MessagesState,
  "searchValue" | "threadsState"
> &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    deleteThreads?: (ids: string[]) => void
    threads: Thread[]
    toggleReadStatus?: (threads: Thread[]) => void
    markThreadsReadStatus?: (threads: Thread[]) => void
  }>

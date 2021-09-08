/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { MessagesState, Thread } from "App/messages/store/messages.interface"

export interface Content {
  id: string
  text: string
}

export type ComponentProps = Pick<MessagesState, "searchValue"> &
  Readonly<{
    changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
    deleteThreads?: (ids: string[]) => void
    threads: Thread[]
    toggleReadStatus?: (ids: string[]) => void
  }>

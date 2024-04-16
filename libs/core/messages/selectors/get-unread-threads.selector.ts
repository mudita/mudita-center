/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Selector } from "reselect"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Thread } from "Core/messages/dto"
import { threadsSelector } from "Core/messages/selectors/threads.selector"

export const getUnreadThreads: Selector<ReduxRootState, Thread[]> = (state) => {
  const threads = threadsSelector(state)
  return threads.filter((thread) => thread.unread)
}

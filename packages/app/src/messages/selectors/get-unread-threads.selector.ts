/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Thread } from "App/messages/reducers"
import { Selector } from "reselect"
import { threadsSelector } from "App/messages/selectors/threads.selector"

export const getUnreadThreads: Selector<ReduxRootState, Thread[]> = (state) => {
  const threads = threadsSelector(state)
  return threads.filter((thread) => thread.unread)
}

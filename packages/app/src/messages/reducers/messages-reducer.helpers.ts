/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadMap } from "App/messages/reducers/messages.interface"
import { Thread } from "App/messages/dto"

export const markThreadsReadStatus = (
  threads: Thread[],
  threadMap: ThreadMap
): ThreadMap => {
  const ids = threads.map((thread) => thread.id)
  return Object.keys(threadMap).reduce(
    (prevThreadMap, id) => {
      if (ids.includes(id)) {
        const thread = prevThreadMap[id]
        prevThreadMap[id] = {
          ...thread,
          unread: false,
        }
        return prevThreadMap
      } else {
        return prevThreadMap
      }
    },
    { ...threadMap }
  )
}

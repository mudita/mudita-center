/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  MessagesState as MessagesProps,
  Thread,
  VisibilityFilter,
} from "App/messages/store/messages.interface"

// export const searchThreads = (
//   threads: Thread[],
//   searchValue: MessagesProps["searchValue"]
// ) => {
//   if (searchValue.length) {
//     return threads?.filter(({ caller, messages }) => {
//       const search = searchValue.toLowerCase()
//       const matchesForename = caller.firstName?.toLowerCase().includes(search)
//       const matchesSurname = caller.lastName?.toLowerCase().includes(search)
//       const matchesPhone = caller.phoneNumber?.includes(search)
//       const matchesMessages = messages.some(({ content }) =>
//         content.toLowerCase().includes(search)
//       )
//       return (
//         matchesForename || matchesSurname || matchesPhone || matchesMessages
//       )
//     })
//   } else {
//     return threads
//   }
// }

export const filterThreads = (
  threads: Thread[],
  visibilityFilter: MessagesProps["visibilityFilter"]
) =>
  threads?.filter(({ unread }) =>
    visibilityFilter === VisibilityFilter.Unread ? unread : true
  )

// export const sortThreads = (threads: Thread[]) => {
//   const lastMessageDate = ({ messages }: Thread) => {
//     return messages[messages.length - 1].date
//   }
//   return threads?.sort((a, b) => {
//     const x = lastMessageDate(a)
//     const y = lastMessageDate(b)
//     return x > y ? -1 : x < y ? 1 : 0
//   })
// }

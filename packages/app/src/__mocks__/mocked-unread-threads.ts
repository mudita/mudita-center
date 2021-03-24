/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "App/messages/store/messages.interface"

export const mockedUnreadThreads: Thread[] = [
  {
    id: 3026752736,
    contactId: "a62a36da-7203-4ba4-a14a-51e4a3d617be",
    lastUpdatedAt: new Date("2019-08-07T13:29:51.401Z"),
    messageSnippet:
      "Sunt autem sed ut aut aspernatur totam modi qui. Atque tenetur est ex totam repudiandae voluptatibus tempora sed.",
    unread: true,
  },
  {
    id: 3026752716,
    contactId: "11a62a36da-7203-4ba4-a14a-51e4a3d617be",
    lastUpdatedAt: new Date("2019-08-07T13:29:51.401Z"),
    messageSnippet:
      "Sunt autem sed ut aut aspernatur totam modi qui. Atque tenetur est ex totam repudiandae voluptatibus tempora sed.",
    unread: true,
  },
]

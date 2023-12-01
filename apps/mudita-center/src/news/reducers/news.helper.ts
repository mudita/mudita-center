/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewsEntry } from "App/news/dto"

export const normalizeNewsEntries = (input: NewsEntry[]): NewsEntry[] => {
  return input.map((entry) => {
    return {
      ...entry,
      content: entry.content.trim(),
      title: entry.title.trim(),
    }
  })
}

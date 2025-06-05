/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createContext } from "react"

export interface HistoryContext {
  paths: string[]
  getPreviousPath: (filter?: (path: string) => boolean) => string
}

export const historyContext = createContext<HistoryContext>({
  paths: [],
  getPreviousPath: () => "/news",
})

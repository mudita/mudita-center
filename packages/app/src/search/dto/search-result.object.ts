/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"

type ScopeKeys =
  | DataIndex.Contact
  | DataIndex.Message
  | DataIndex.Template
  | DataIndex.Thread

export type SearchResult = {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in ScopeKeys]?: any[] | undefined
}

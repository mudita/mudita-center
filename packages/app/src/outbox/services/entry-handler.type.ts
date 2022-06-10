/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntry } from "@mudita/pure"

export interface EntryHandler<Type = {}> {
  handleEntry(entry: OutboxEntry): Promise<Type | undefined>
}

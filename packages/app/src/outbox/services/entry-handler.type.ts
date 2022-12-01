/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntry } from "App/device/types/mudita-os"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
export interface EntryHandler<Type = {}> {
  handleEntry(entry: OutboxEntry): Promise<Type | undefined>
}

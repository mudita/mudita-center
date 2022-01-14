/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactObject } from "App/data-sync/types/contact-object.type"

export interface AllIndexes {
  contacts: Record<string, ContactObject>
}

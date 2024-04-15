/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type UnifiedContact = {
  id: string
  firstName?: string
  lastName?: string
  displayName: string
  phoneNumbers: {
    type?: string
    value: string
    preference?: number
    label?: string
  }[]
}

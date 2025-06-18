/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type AppSettings = {
  version: string
  user: {
    privacyPolicyAccepted: boolean
    backupLocation: string
  }
  system: {
    analyticsId: string | null
  }
}

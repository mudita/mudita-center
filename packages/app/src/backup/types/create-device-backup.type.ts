/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface CreateDeviceBackup {
  cwd: string
  token?: string
  extract?: boolean
  key?: string
}

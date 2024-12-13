/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const electronApi = {
  SerialPort: window.api?.SerialPort || {
    list: async () => {
      return ["test"]
    },
  },
} as const

export default electronApi

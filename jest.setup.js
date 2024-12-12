/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

Object.assign(window, {
  api: {
    SerialPort: {
      list: () => {
        return new Promise.resolve([
          {
            path: "/dev/KOM123",
          },
          {
            path: "/dev/KOM456",
          },
        ])
      },
    },
  },
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

class PQueue {
  constructor() {
    return this
  }
  add = jest.fn()
  pause = jest.fn()
  clear = jest.fn()
}

jest.doMock("p-queue", () => {
  return {
    __esModule: true,
    default: PQueue,
  }
})

Object.assign(window, {
  electron: {
    ipcRenderer: {
      invoke: jest.fn(),
    },
  },
})

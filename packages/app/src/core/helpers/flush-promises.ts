/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export function flushPromises() {
  return new Promise(jest.requireActual("timers").setImmediate)
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const JsonStore = {
  get: window.api.jsonStore.get,
  init: window.api.jsonStore.init,
  has: window.api.jsonStore.has,
  set: window.api.jsonStore.set,
}

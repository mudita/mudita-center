/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export default class PQueue {
  constructor() {
    return this;
  }
  add(fn: () => void) {
    return fn();
  }
  pause() {}
  clear() {}
}

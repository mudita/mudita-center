/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

<<<<<<<< HEAD:packages/app/src/__mocks__/p-queue.ts
export default class PQueue {
  constructor() {
    return this;
  }
  add(fn: () => void) {
    return fn();
  }
  pause() {}
  clear() {}
========
export const v4 = () => {
  return undefined;
>>>>>>>> develop:packages/app/src/__mocks__/uuid.ts
}

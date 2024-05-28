/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class MockUpdaterStateService {
  private _enabled = false

  get enabled(): boolean {
    return this._enabled
  }

  set enabled(value) {
    this._enabled = value
  }
}

export const mockUpdaterStateService = new MockUpdaterStateService()

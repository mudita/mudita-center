/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UpdateState {
  available: boolean
  version?: string
}

export class MockUpdaterStateService {
  private _updateState: UpdateState = {
    available: false,
  }

  get updateState(): UpdateState {
    return this._updateState
  }

  set updateState(value: UpdateState) {
    this._updateState = value
  }
}

export const mockUpdaterStateService = new MockUpdaterStateService()

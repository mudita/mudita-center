/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UpdateState {
  available: boolean
  downloaded?: boolean
  version?: string
}

const defaultUpdateState: UpdateState = {
  available: false,
  downloaded: true,
}

export class MockUpdaterStateService {
  private _updateState = { ...defaultUpdateState }

  get updateState(): UpdateState {
    return this._updateState
  }

  set updateState(value: UpdateState) {
    this._updateState = { ...defaultUpdateState, ...value }
  }
}

export const mockUpdaterStateService = new MockUpdaterStateService()

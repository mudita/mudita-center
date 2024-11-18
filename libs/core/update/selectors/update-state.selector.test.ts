/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { initialState, updateOsReducer } from "Core/update/reducers"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"

jest.mock("history", () => ({
  createHashHistory: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    location: { pathname: "", search: "", hash: "", state: null },
  })),
}))

describe("`updateStateSelector` selector", () => {
  test("when initial state is set selector returns initial state", () => {
    const state = {
      // TODO: make some helper for mocks state from the root or the core domain to handle warning
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      update: updateOsReducer(initialState, {} as any),
    } as ReduxRootState
    expect(updateStateSelector(state)).toEqual(initialState)
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { State } from "App/core/constants"
import {
  resetDeletingState,
  resetUploadingState,
  setUploadingState,
  setUploadBlocked,
} from "App/files-manager/actions/base.action"
import { FilesManagerEvent } from "App/files-manager/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: `setUploadingState`", () => {
  test("dispatch action with provided payload", () => {
    mockStore.dispatch(setUploadingState(State.Loaded))
    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.SetUploadingState,
        payload: State.Loaded,
      },
    ])
  })
})

describe("Action: `resetDeletingState`", () => {
  test("dispatch action with provided payload", () => {
    mockStore.dispatch(resetDeletingState())
    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.ResetDeletingState,
        payload: undefined,
      },
    ])
  })
})

describe("Action: `resetUploadingState`", () => {
  test("dispatch action with provided payload", () => {
    mockStore.dispatch(resetUploadingState())
    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.ResetUploadingState,
        payload: undefined,
      },
    ])
  })
})

describe("Action: `setUploadBlocked`", () => {
  test("dispatch action with provided payload", () => {
    mockStore.dispatch(setUploadBlocked(true))
    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.SetUploadBlocked,
        payload: true,
      },
    ])
  })
})

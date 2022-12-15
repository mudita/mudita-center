/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { setUpdateState } from "App/update/actions"
import { UpdateOsEvent } from "App/update/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setUpdateState", () => {
  test("fire action with `Loading` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(State.Loading))
    expect(mockStore.getActions()).toEqual([
      {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Loading,
      },
    ])
  })

  test("fire action with `Loaded` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(State.Loaded))
    expect(mockStore.getActions()).toEqual([
      {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Loaded,
      },
    ])
  })

  test("fire action with `Initial` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(State.Initial))
    expect(mockStore.getActions()).toEqual([
      {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Initial,
      },
    ])
  })

  test("fire action with `Failed` state and `SetUpdateState` type", () => {
    mockStore.dispatch(setUpdateState(State.Failed))
    expect(mockStore.getActions()).toEqual([
      {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Failed,
      },
    ])
  })
})

// TODO [mw] add tests for setStateForDownloadedRelease and setStateForInstalledRelease

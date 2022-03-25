/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { setFiles } from "App/files-manager/actions/base.action"
import { FilesManagerEvent } from "App/files-manager/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: setFiles", () => {
  test("fire action with empty array and `SetFiles` type", () => {
    mockStore.dispatch(setFiles([]))
    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.SetFiles,
        payload: [],
      },
    ])
  })
})

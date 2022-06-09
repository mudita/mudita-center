/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { hideDeleteModal } from "App/templates/actions/base.action"
import { TemplatesEvent } from "App/templates/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: hideDeleteModal", () => {
  test("fire action without payload and `HideDeleteModal` type", () => {
    mockStore.dispatch(hideDeleteModal())
    expect(mockStore.getActions()).toEqual([
      {
        type: TemplatesEvent.HideDeleteModal,
        payload: undefined,
      },
    ])
  })
})

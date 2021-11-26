/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { hideModals, showModal } from "App/modals-manager/actions/base.action"
import { ModalStateKey } from "App/modals-manager/reducers"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: `showModal`", () => {
  test("fire action with `ModalStateKey` and `ShowModal` type", () => {
    mockStore.dispatch(showModal(ModalStateKey.appForcedUpdateFlow))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.ShowModal,
        payload: ModalStateKey.appForcedUpdateFlow,
      },
    ])
  })
})

describe("Action: `hideModals`", () => {
  test("fire action with `HideModals` type", () => {
    mockStore.dispatch(hideModals())
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.HideModals,
        payload: undefined,
      },
    ])
  })
})

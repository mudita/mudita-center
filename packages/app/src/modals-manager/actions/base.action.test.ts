/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { hideModals, showModal } from "App/modals-manager/actions/base.action"
import { ModalKey } from "App/modals-manager/reducers"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: hideModals", () => {
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

describe("Action: showModal", () => {
  test("fire action with `ModalKey.CollectingDataModal` and `ShowModal` type", () => {
    mockStore.dispatch(showModal(ModalKey.CollectingDataModal))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.ShowModal,
        payload: ModalKey.CollectingDataModal,
      },
    ])
  })

  test("fire action with `ModalKey.ForcedUpdateFlow` and `ShowModal` type", () => {
    mockStore.dispatch(showModal(ModalKey.ForcedUpdateFlow))
    expect(mockStore.getActions()).toEqual([
      {
        type: ModalsManagerEvent.ShowModal,
        payload: ModalKey.ForcedUpdateFlow,
      },
    ])
  })
})

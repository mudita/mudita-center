/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { devClearAllContacts } from "App/contacts/actions/base.action"
import { ContactsEvent } from "App/contacts/constants"

const mockStore = createMockStore([thunk])()

afterEach(() => {
  mockStore.clearActions()
})

describe("Action: devClearAllContacts", () => {
  test("fire action without payload and `DevClearAllContacts` type", () => {
    mockStore.dispatch(devClearAllContacts())
    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.DevClearAllContacts,
        payload: undefined,
      },
    ])
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { AnyAction } from "@reduxjs/toolkit"
import {
  selectAllItems,
  toggleItem,
  resetAllItems,
} from "App/contacts/actions/select-items.action"
import { initialState } from "App/contacts/reducers/contacts.reducer"
import { ContactsEvent } from "App/contacts/constants"

afterEach(() => {
  jest.resetAllMocks()
})

describe("Action: `selectAllItems`", () => {
  test("returns empty list if `contacts` collection is empty", async () => {
    const mockStore = createMockStore([thunk])({
      contacts: {
        ...initialState,
        collection: [],
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(selectAllItems() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      selectAllItems.pending(requestId),
      selectAllItems.fulfilled([], requestId),
    ])
  })

  test("returns collection list if `contacts` collection is has some ids", async () => {
    const mockStore = createMockStore([thunk])({
      contacts: {
        ...initialState,
        collection: ["1", "2", "3"],
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(selectAllItems() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      selectAllItems.pending(requestId),
      selectAllItems.fulfilled(["1", "2", "3"], requestId),
    ])
  })
})

describe("Action: `toggleItem`", () => {
  test("set selected item if it's not exist's in selectedItem list", async () => {
    const mockStore = createMockStore([thunk])({
      contacts: {
        ...initialState,
        selectedItems: {
          rows: ["1"],
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(toggleItem("2") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      toggleItem.pending(requestId, "2"),
      toggleItem.fulfilled(["1", "2"], requestId, "2"),
    ])
  })

  test("remove selected item if it's exist's in selectedItem list", async () => {
    const mockStore = createMockStore([thunk])({
      contacts: {
        ...initialState,
        selectedItems: {
          rows: ["1", "2"],
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(toggleItem("2") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      toggleItem.pending(requestId, "2"),
      toggleItem.fulfilled(["1"], requestId, "2"),
    ])
  })
})

describe("Action: `resetAllItems`", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("dispatch `ContactsEvent.ResetAllItems` event", async () => {
    const mockStore = createMockStore([thunk])({
      contacts: {
        ...initialState,
        selectedItems: {
          rows: ["1"],
        },
      },
    })

    mockStore.dispatch(resetAllItems() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      {
        type: ContactsEvent.ResetAllItems,
        payload: undefined,
      },
    ])
  })
})

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
} from "Core/files-manager/actions/select-items.action"
import { initialState } from "Core/files-manager/reducers/files-manager.reducer"
import { FilesManagerEvent } from "Core/files-manager/constants"

afterEach(() => {
  jest.resetAllMocks()
})

describe("Action: `selectAllItems`", () => {
  test("returns empty list if `files` list is empty", async () => {
    const mockStore = createMockStore([thunk])({
      filesManager: {
        ...initialState,
        files: [],
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

  test("returns files list if `files` list has some ids", async () => {
    const mockStore = createMockStore([thunk])({
      filesManager: {
        ...initialState,
        files: [
          {
            id: "1",
          },
          {
            id: "2",
          },
          {
            id: "3",
          },
        ],
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
      filesManager: {
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
      filesManager: {
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
  test("dispatch `FilesManagerEvent.ResetAllItems` event", async () => {
    const mockStore = createMockStore([thunk])({
      filesManager: {
        ...initialState,
        selectedItems: {
          rows: ["1"],
        },
      },
    })

    mockStore.dispatch(resetAllItems() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      {
        type: FilesManagerEvent.ResetAllItems,
        payload: undefined,
      },
    ])
  })
})

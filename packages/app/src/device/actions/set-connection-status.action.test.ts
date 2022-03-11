/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceEvent, UpdatingState } from "App/device/constants"
import { setConnectionStatus } from "App/device/actions"
import { setValue } from "App/metadata"
import { RestoreDeviceDataState } from "App/restore-device/reducers"
import { DataSyncEvent } from "App/data-sync/constants"

jest.mock("App/metadata")
const state = {
  device: {
    updatingState: null,
  },
  restoreDevice: {
    state: RestoreDeviceDataState.Empty,
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `setConnectionStatus` ", () => {
  describe("when any process isn't continues during on action triggering", () => {
    test("the action no make any side effects when payload is `true`", async () => {
      const store = createMockStore([thunk])(state)

      const {
        meta: { requestId },
      } = await store.dispatch(
        setConnectionStatus(true) as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        setConnectionStatus.pending(requestId, true),
        setConnectionStatus.fulfilled(true, requestId, true),
      ])
    })

    test("`setInit` is dispatch if the payload is `false`", async () => {
      const store = createMockStore([thunk])(state)

      const {
        meta: { requestId },
      } = await store.dispatch(
        setConnectionStatus(false) as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        setConnectionStatus.pending(requestId, false),
        {
          payload: undefined,
          type: DataSyncEvent.SetDataSyncInitState,
        },
        {
          payload: undefined,
          type: DeviceEvent.SetInitState,
        },
        setConnectionStatus.fulfilled(false, requestId, false),
      ])
    })

    test("`setValue` is dispatch if the payload is `false`", async () => {
      const store = createMockStore([thunk])(state)

      await store.dispatch(setConnectionStatus(false) as unknown as AnyAction)

      expect(setValue).toHaveBeenCalled()
    })
  })

  describe("when `updatingState` in `device` is set to `Updating`", () => {
    test("do not call `setInitState`", async () => {
      const store = createMockStore([thunk])({
        device: {
          updatingState: UpdatingState.Updating,
        },
      })

      const {
        meta: { requestId },
      } = await store.dispatch(
        setConnectionStatus(false) as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        setConnectionStatus.pending(requestId, false),
        {
          payload: undefined,
          type: DataSyncEvent.SetDataSyncInitState,
        },
        setConnectionStatus.fulfilled(false, requestId, false),
      ])
    })

    test("do not call `setValue`", async () => {
      const store = createMockStore([thunk])({
        device: {
          updatingState: UpdatingState.Updating,
        },
      })

      await store.dispatch(setConnectionStatus(false) as unknown as AnyAction)

      expect(setValue).not.toHaveBeenCalled()
    })
  })

  describe("`state` in `restoreDevice` is set to `Running`", () => {
    test("do not call `setInitState`", async () => {
      const store = createMockStore([thunk])({
        ...state,
        restoreDevice: {
          state: RestoreDeviceDataState.Running,
        },
      })

      const {
        meta: { requestId },
      } = await store.dispatch(
        setConnectionStatus(false) as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        setConnectionStatus.pending(requestId, false),
        {
          payload: undefined,
          type: DataSyncEvent.SetDataSyncInitState,
        },
        setConnectionStatus.fulfilled(false, requestId, false),
      ])
    })

    test("do not call `setValue`", async () => {
      const store = createMockStore([thunk])({
        ...state,
        restoreDevice: {
          state: RestoreDeviceDataState.Running,
        },
      })

      await store.dispatch(setConnectionStatus(false) as unknown as AnyAction)

      expect(setValue).not.toHaveBeenCalled()
    })
  })
})

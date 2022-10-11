/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import { DeviceEvent, UpdatingState } from "App/device/constants"
import { setConnectionStatus } from "App/device/actions"
import { setValue } from "App/metadata"
import { State } from "App/core/constants"
import { DataSyncEvent } from "App/data-sync/constants"

jest.mock("App/metadata")
const state = {
  device: {
    updatingState: null,
  },
  backup: {
    restoringState: State.Initial,
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
        {
          payload: undefined,
          type: BackupEvent.ReadRestoreDeviceDataState,
        },
        setConnectionStatus.fulfilled(false, requestId, false),
      ])
    })

    test("`setValue` is dispatch if the payload is `false`", async () => {
      const store = createMockStore([thunk])(state)

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await store.dispatch(setConnectionStatus(false) as unknown as AnyAction)

      expect(setValue).not.toHaveBeenCalled()
    })
  })

  describe("`state` in `restoreDevice` is set to `Loading`", () => {
    test("do not call `setInitState`", async () => {
      const store = createMockStore([thunk])({
        ...state,
        backup: {
          restoringState: State.Loading,
        },
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
        backup: {
          restoringState: State.Loading,
        },
      })

      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await store.dispatch(setConnectionStatus(false) as unknown as AnyAction)

      expect(setValue).not.toHaveBeenCalled()
    })
  })

  describe("`state` in `restoreDevice` is set to `Failed`", () => {
    test("call `setInitState`", async () => {
      const store = createMockStore([thunk])({
        ...state,
        backup: {
          restoringState: State.Failed,
        },
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
        {
          payload: undefined,
          type: BackupEvent.ReadRestoreDeviceDataState,
        },
        setConnectionStatus.fulfilled(false, requestId, false),
      ])

      expect(setValue).toHaveBeenCalled()
    })
  })
})

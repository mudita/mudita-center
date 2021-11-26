/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "Renderer/models/settings/settings"
import { ReduxRootState, RootState } from "Renderer/store"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { ModalStateKey } from "App/modals-manager/reducers"
import { checkCollectingDataModalToShow } from "App/modals-manager/actions/check-collecting-data-modal-to-show.action"

describe("async `checkCollectingDataModalToShow` ", () => {
  describe("when store state is set to default", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: initialState,
    }

    test("fire async `checkCollectingDataModalToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkCollectingDataModalToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkCollectingDataModalToShow.pending(requestId, undefined),
        checkCollectingDataModalToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `appCollectingData` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...initialState, appCollectingData: true },
    }

    test("fire async `checkCollectingDataModalToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkCollectingDataModalToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkCollectingDataModalToShow.pending(requestId, undefined),
        checkCollectingDataModalToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `appCollectingData` in settings is set to false", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...initialState, appCollectingData: false },
    }

    test("fire async `checkCollectingDataModalToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkCollectingDataModalToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkCollectingDataModalToShow.pending(requestId, undefined),
        checkCollectingDataModalToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `appCollectingData` is set to `undefined` and `settingsLoaded` is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: {
        ...initialState,
        appCollectingData: undefined,
        settingsLoaded: true,
      },
    }

    test("fire async `checkCollectingDataModalToShow` call `ShowModal`", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkCollectingDataModalToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkCollectingDataModalToShow.pending(requestId, undefined),
        {
          payload: ModalStateKey.collectingDataModal,
          type: ModalsManagerEvent.ShowModal,
        },
        checkCollectingDataModalToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })
})

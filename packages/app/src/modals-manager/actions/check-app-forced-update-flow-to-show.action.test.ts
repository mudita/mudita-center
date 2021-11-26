/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { initialState } from "Renderer/models/settings/settings"
import { ReduxRootState, RootState } from "Renderer/store"
import { checkAppForcedUpdateFlowToShow } from "App/modals-manager/actions/check-app-forced-update-flow-to-show.action"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { ModalStateKey } from "App/modals-manager/reducers"

describe("async `checkAppForcedUpdateFlowToShow` ", () => {
  describe("when store state is set to default", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: initialState,
    }

    test("fire async `checkAppForcedUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppForcedUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppForcedUpdateFlowToShow.pending(requestId, undefined),
        checkAppForcedUpdateFlowToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `settingsLoaded` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...initialState, settingsLoaded: true },
    }

    test("fire async `checkAppForcedUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppForcedUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppForcedUpdateFlowToShow.pending(requestId, undefined),
        checkAppForcedUpdateFlowToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `appUpdateRequired` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: { ...initialState, appUpdateRequired: true },
    }

    test("fire async `checkAppForcedUpdateFlowToShow` no made any side effects", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppForcedUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppForcedUpdateFlowToShow.pending(requestId, undefined),
        checkAppForcedUpdateFlowToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })

  describe("when `appUpdateRequired` and `settingsLoaded` in settings is set to true", () => {
    const storeState: Partial<RootState & ReduxRootState> = {
      settings: {
        ...initialState,
        appUpdateRequired: true,
        settingsLoaded: true,
      },
    }

    test("fire async `checkAppForcedUpdateFlowToShow` call `ShowModal`", async () => {
      const store = createMockStore([thunk])(storeState)

      const {
        meta: { requestId },
      } = await store.dispatch(
        checkAppForcedUpdateFlowToShow() as unknown as AnyAction
      )

      expect(store.getActions()).toEqual([
        checkAppForcedUpdateFlowToShow.pending(requestId, undefined),
        {
          payload: ModalStateKey.appForcedUpdateFlow,
          type: ModalsManagerEvent.ShowModal
        },
        checkAppForcedUpdateFlowToShow.fulfilled(
          undefined,
          requestId,
          undefined
        ),
      ])
    })
  })
})

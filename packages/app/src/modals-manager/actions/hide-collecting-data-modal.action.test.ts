/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers"
import { ModalsManagerEvent } from "App/modals-manager/constants"
import { hideCollectingDataModal } from "App/modals-manager/actions/hide-collecting-data-modal.action"
import { initialState as settingsInitialState } from "Renderer/models/settings/settings"
import { initialState as modalsManagerInitialState } from "App/modals-manager/reducers"
import { ReduxRootState, RootState } from "Renderer/store"

jest.mock(
  "App/modals-manager/actions/check-app-update-flow-to-show.action",
  () => ({
    checkAppUpdateFlowToShow: jest.fn().mockReturnValue({
      type: pendingAction(ModalsManagerEvent.CheckAppUpdateFlowToShow),
      payload: undefined,
    }),
  })
)

jest.mock(
  "App/modals-manager/actions/check-app-forced-update-flow-to-show.action",
  () => ({
    checkAppForcedUpdateFlowToShow: jest.fn().mockReturnValue({
      type: pendingAction(ModalsManagerEvent.CheckAppForcedUpdateFlowToShow),
      payload: undefined,
    }),
  })
)

describe("async `hideCollectingDataModal` ", () => {
  const storeState: Partial<RootState & ReduxRootState> = {
    settings: settingsInitialState,
    modalsManager: modalsManagerInitialState,
  }

  test("fire async `hideCollectingDataModal` dispatch 3 actions", async () => {
    const store = createMockStore([thunk])(storeState)

    const {
      meta: { requestId },
    } = await store.dispatch(hideCollectingDataModal() as unknown as AnyAction)

    expect(store.getActions()).toEqual([
      hideCollectingDataModal.pending(requestId, undefined),
      {
        payload: undefined,
        type: ModalsManagerEvent.HideModals,
      },
      {
        type: pendingAction(ModalsManagerEvent.CheckAppUpdateFlowToShow),
        payload: undefined,
      },
      {
        type: pendingAction(ModalsManagerEvent.CheckAppForcedUpdateFlowToShow),
        payload: undefined,
      },
      hideCollectingDataModal.fulfilled(undefined, requestId, undefined),
    ])
  })
})

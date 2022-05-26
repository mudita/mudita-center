/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { TemplateState } from "App/templates/reducers"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { fulfilledAction } from "Renderer/store/helpers"

export const initialState: TemplateState = {
  data: [],
  error: null,
}

export const templateReducer = createReducer<TemplateState>(
  initialState,
  (builder) => {
    builder.addCase(
      fulfilledAction(DataSyncEvent.ReadAllIndexes),
      (state, action: ReadAllIndexesAction) => {
        return {
          ...state,
          data: Object.values(action.payload.templates),
        }
      }
    )
  }
)

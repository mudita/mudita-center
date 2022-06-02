/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  TemplateState,
  CreateTemplateRejectedAction,
  CreateTemplateFulfilledAction,
} from "App/templates/reducers/template.interface"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import {
  pendingAction,
  rejectedAction,
  fulfilledAction,
} from "Renderer/store/helpers"
import { TemplatesEvent } from "App/templates/constants"

export const initialState: TemplateState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
}

export const templateReducer = createReducer<TemplateState>(
  initialState,
  (builder) => {
    builder.addCase(pendingAction(TemplatesEvent.CreateTemplate), (state) => {
      return {
        ...state,
        loaded: false,
        loading: true,
      }
    })

    builder.addCase(
      fulfilledAction(TemplatesEvent.CreateTemplate),
      (state, action: CreateTemplateFulfilledAction) => {
        return {
          ...state,
          data: [...state.data, action.payload],
          error: null,
          loaded: true,
          loading: false,
        }
      }
    )

    builder.addCase(
      rejectedAction(TemplatesEvent.CreateTemplate),
      (state, action: CreateTemplateRejectedAction) => {
        return {
          ...state,
          error: action.payload.message,
          loaded: false,
          loading: false,
        }
      }
    )

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

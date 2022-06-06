/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { TemplateState, DeleteTemplateAction } from "App/templates/reducers"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { fulfilledAction } from "Renderer/store/helpers"
import { TemplatesEvent, TemplateDeletingState } from "App/templates/constants"

export const initialState: TemplateState = {
  data: [],
  error: null,
  deletingState: null,
}

export const templateReducer = createReducer<TemplateState>(
  initialState,
  (builder) => {
    builder
      .addCase(
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
          return {
            ...state,
            data: Object.values(action.payload.templates),
          }
        }
      )
      .addCase(
        fulfilledAction(TemplatesEvent.DeleteTemplates),
        (state, action: DeleteTemplateAction) => {
          const ids = action.payload
          const templates = [...state.data]

          const updatedTemplates = templates.filter(
            (template) => !ids.some((id) => id === template.id)
          )

          return {
            ...state,
            deletingState: TemplateDeletingState.Success,
            data: updatedTemplates,
          }
        }
      )
  }
)

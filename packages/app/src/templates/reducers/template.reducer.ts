/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { TemplatesEvent } from "App/templates/constants"
import {
  TemplateState,
  DeleteTemplateAction,
  CreateTemplateRejectedAction,
  CreateTemplateFulfilledAction,
  UpdateTemplateFulfilledAction,
  DeleteTemplateRejectedAction,
  UpdateTemplateRejectedAction,
  UpdateTemplateOrderFulfilledAction,
  UpdateTemplateOrderRejectedAction,
} from "App/templates/reducers/template.interface"
import {
  pendingAction,
  rejectedAction,
  fulfilledAction,
} from "App/__deprecated__/renderer/store/helpers"
import {
  selectAllItems,
  resetAllItems,
  toggleItem,
} from "App/templates/actions"
import { changeLocation } from "App/core/actions"

export const initialState: TemplateState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
  selectedItems: {
    rows: [],
  },
}

export const templateReducer = createReducer<TemplateState>(
  initialState,
  (builder) => {
    builder
      .addCase(pendingAction(TemplatesEvent.CreateTemplate), (state) => {
        return {
          ...state,
          loaded: false,
          loading: true,
        }
      })

      .addCase(
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

      .addCase(
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

      .addCase(pendingAction(TemplatesEvent.UpdateTemplate), (state) => {
        return {
          ...state,
          error: null,
          loaded: false,
          loading: true,
        }
      })

      .addCase(
        fulfilledAction(TemplatesEvent.UpdateTemplate),
        (state, action: UpdateTemplateFulfilledAction) => {
          const updatedList = state.data.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload
            }

            return item
          })

          return {
            ...state,
            error: null,
            data: updatedList,
            loaded: true,
            loading: false,
          }
        }
      )

      .addCase(
        rejectedAction(TemplatesEvent.UpdateTemplate),
        (state, action: UpdateTemplateRejectedAction) => {
          return {
            ...state,
            error: action.payload.message,
            loaded: false,
            loading: false,
          }
        }
      )

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
            deleting: true,
            data: updatedTemplates,
            loaded: true,
            loading: false,
          }
        }
      )
      .addCase(pendingAction(TemplatesEvent.DeleteTemplates), (state) => {
        return {
          ...state,
          deleting: true,
          loaded: false,
          loading: true,
          error: null,
        }
      })
      .addCase(
        rejectedAction(TemplatesEvent.DeleteTemplates),
        (state, action: DeleteTemplateRejectedAction) => {
          return {
            ...state,
            deleting: true,
            loaded: false,
            loading: false,
            error: action.payload.message,
          }
        }
      )

      .addCase(pendingAction(TemplatesEvent.UpdateTemplateOrder), (state) => {
        return {
          ...state,
          error: null,
          loaded: false,
          loading: true,
        }
      })

      .addCase(
        fulfilledAction(TemplatesEvent.UpdateTemplateOrder),
        (state, action: UpdateTemplateOrderFulfilledAction) => {
          const updatedList = state.data.map((item) => {
            const updatedTemplate = action.payload.find(
              (template) => item.id === template.id
            )
            return updatedTemplate ? updatedTemplate : item
          })
          const orderedList = updatedList.sort(function (a, b) {
            return a.order && b.order ? a.order - b.order : -1
          })

          return {
            ...state,
            error: null,
            data: orderedList,
            loaded: true,
            loading: false,
          }
        }
      )

      .addCase(
        rejectedAction(TemplatesEvent.UpdateTemplateOrder),
        (state, action: UpdateTemplateOrderRejectedAction) => {
          return {
            ...state,
            error: action.payload.message,
            loaded: false,
            loading: false,
          }
        }
      )

      .addCase(selectAllItems.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
          },
        }
      })
      .addCase(toggleItem.fulfilled, (state, action) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: action.payload,
          },
        }
      })
      .addCase(resetAllItems, (state) => {
        return {
          ...state,
          selectedItems: {
            ...state.selectedItems,
            rows: [],
          },
        }
      })
      .addCase(changeLocation, (state) => {
        return { ...state, selectedItems: { rows: [] } }
      })
  }
)

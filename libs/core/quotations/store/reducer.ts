/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { Quotation } from "./types"
import {
  addQuotation,
  removeQuotations,
  setQuotations,
  setSelectedQuotations,
  toggleAllQuotationsSelection,
  toggleQuotationSelection,
} from "./actions"

export interface QuotationsState {
  items: Quotation[]
  selectedItems: Quotation["id"][]
}

export const initialState: QuotationsState = {
  items: [],
  selectedItems: [],
}

export const quotationsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setQuotations, (state, action) => {
    state.items = action.payload
  })
  builder.addCase(addQuotation, (state, action) => {
    state.items.push(action.payload)
  })
  builder.addCase(removeQuotations, (state, action) => {
    state.items = state.items.filter(
      (quotation) => !action.payload.includes(quotation.id)
    )
  })
  builder.addCase(setSelectedQuotations, (state, action) => {
    state.selectedItems = action.payload
  })
  builder.addCase(toggleQuotationSelection, (state, action) => {
    const quotationId = action.payload
    const isSelected = state.selectedItems.includes(quotationId)

    if (isSelected) {
      state.selectedItems = state.selectedItems.filter(
        (id) => id !== quotationId
      )
    } else {
      state.selectedItems.push(quotationId)
    }
  })
  builder.addCase(toggleAllQuotationsSelection, (state) => {
    if (state.selectedItems.length === state.items.length) {
      state.selectedItems = []
    } else {
      state.selectedItems = state.items.map((quotation) => quotation.id)
    }
  })
})

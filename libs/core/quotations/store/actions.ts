/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Quotation } from "./types"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const setQuotations = createAction<Quotation[]>(
  "quotations/setQuotations"
)
export const addQuotation = createAction<Quotation>("quotations/addQuotation")
export const removeQuotations = createAction<Quotation["id"][]>(
  "quotations/removeQuotation"
)

export const setSelectedQuotations = createAction<Quotation["id"][]>(
  "quotations/setSelectedQuotations"
)
export const toggleQuotationSelection = createAction<Quotation["id"]>(
  "quotations/toggleQuotationsSelect"
)
export const toggleAllQuotationsSelection = createAction(
  "quotations/toggleAllQuotationsSelect"
)

export const deleteQuotations = createAsyncThunk<
  void,
  Quotation["id"][] | undefined,
  { state: ReduxRootState }
>("quotations/deleteQuotations", (quotationIds, { dispatch, getState }) => {
  const { quotations } = getState()

  // TODO: Implement deleting quotations from device

  dispatch(removeQuotations(quotationIds || quotations.selectedItems))
  dispatch(setSelectedQuotations([]))
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Quotation } from "./types"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Source } from "../components/settings-source-form"
import { Interval } from "../components/settings-interval-form"
import {
  deleteQuotationsRequest,
  getQuotationsSettingsRequest,
} from "../service/requests"
import { getIndexRequest, indexAllRequest } from "Core/data-sync/requests"
import { DataIndex } from "Core/data-sync/constants"

export const setQuotations = createAction<Quotation[]>(
  "quotations/setQuotations"
)
export const addQuotation = createAction<Quotation>("quotations/addQuotation")
export const removeQuotations = createAction<Quotation["id"][]>(
  "quotations/removeQuotation"
)

export const setQuotationsSettings = createAction<{
  source: Source
  interval: Interval
}>("quotations/setQuotationsSettings")

export const setSelectedQuotations = createAction<Quotation["id"][]>(
  "quotations/setSelectedQuotations"
)
export const toggleQuotationSelection = createAction<Quotation["id"]>(
  "quotations/toggleQuotationsSelect"
)
export const toggleAllQuotationsSelection = createAction(
  "quotations/toggleAllQuotationsSelect"
)
export const clearQuotations = createAction("quotations/clearQuotations")

export const fetchQuotationsSettings = createAsyncThunk(
  "quotations/fetchQuotationsSettings",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await getQuotationsSettingsRequest()
    if (!response.ok) {
      return rejectWithValue({ source: undefined, interval: undefined })
    }

    dispatch(
      setQuotationsSettings({
        source: response.data.group as Source,
        interval: response.data.interval as Interval,
      })
    )
    return
  }
)

export const fetchQuotations = createAsyncThunk<
  Quotation[],
  { serialNumber: string },
  { state: ReduxRootState }
>("quotations/fetchQuotations", async ({ serialNumber }) => {
  await indexAllRequest({
    serialNumber,
    requiredIndexes: [DataIndex.Quotations],
  })
  const response = await getIndexRequest(DataIndex.Quotations)

  return Object.values(response?.documentStore.docs || {}).map((doc) => {
    return {
      id: Number(doc.id),
      text: doc.quote,
      author: doc.author,
    } as Quotation
  })
})

export const deleteQuotations = createAsyncThunk<
  void,
  Quotation["id"][],
  { state: ReduxRootState }
>(
  "quotations/deleteQuotations",
  async (quotationIds, { dispatch, getState }) => {
    const { quotations } = getState()

    await deleteQuotationsRequest(quotationIds)

    dispatch(removeQuotations(quotationIds || quotations.selectedItems))
    dispatch(setSelectedQuotations([]))

    if (getState().quotations.items.length === 0) {
      dispatch(fetchQuotationsSettings())
    }
  }
)

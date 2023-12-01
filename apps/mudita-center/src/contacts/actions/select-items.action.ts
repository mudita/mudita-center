/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { ContactsEvent } from "App/contacts/constants"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const selectAllItems = createAsyncThunk<string[]>(
  ContactsEvent.SelectAllItems,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (_, { getState }) => {
    const state = getState() as RootState & ReduxRootState
    const contactIds = state.contacts.collection

    return contactIds
  }
)

export const toggleItem = createAsyncThunk<string[], string>(
  ContactsEvent.ToggleItem,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  async (payload, { getState }) => {
    const state = getState() as RootState & ReduxRootState
    const selectedItems = state.contacts.selectedItems.rows

    if (selectedItems.includes(payload)) {
      return selectedItems.filter((item) => item !== payload)
    } else {
      return [...selectedItems, payload]
    }
  }
)

export const resetAllItems = createAction(ContactsEvent.ResetAllItems)

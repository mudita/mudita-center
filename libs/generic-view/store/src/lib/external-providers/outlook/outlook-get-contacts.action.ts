/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { ActionName } from "../../action-names"
import { OutLookScope } from "./outlook.interface"
import { fetchContacts, isOutlookException } from "./outlook.helpers"
import { TokenRequester } from "./token-requester"
import { setOutlookAuthData } from "../actions"

export const outlookGetContacts = createAsyncThunk<
  Contact[],
  undefined,
  { state: ReduxRootState }
>(
  ActionName.OutlookGetContactsProcess,
  async (payload, { getState, dispatch, rejectWithValue, signal }) => {
    const accessToken =
      getState().externalProviders.outlook[OutLookScope.Contacts].accessToken
    const refreshToken =
      getState().externalProviders.outlook[OutLookScope.Contacts].refreshToken

    try {
      return await fetchContacts(accessToken)
    } catch (ex) {
      if (isOutlookException(ex) && ex.error === "invalid_grant") {
        const tokenRequester = new TokenRequester()
        const regeneratedTokens = await tokenRequester.regenerateTokens(
          refreshToken,
          OutLookScope.Contacts
        )

        dispatch(
          setOutlookAuthData({
            scope: OutLookScope.Contacts,
            data: regeneratedTokens,
          })
        )
        return await fetchContacts(regeneratedTokens.accessToken)
      } else {
        return []
      }
    }
  }
)

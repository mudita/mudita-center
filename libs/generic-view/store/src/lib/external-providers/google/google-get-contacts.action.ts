/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionName } from "../../action-names"
import {
  GoogleContactResourceItem,
  GoogleContacts,
  Scope,
} from "./google.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { mapContact, requestWrapper } from "./google.helpers"
import { AxiosResponse } from "axios"
import { Contact } from "Core/contacts/reducers/contacts.interface"

const GOOGLE_ENDPOINTS = {
  people: "https://people.googleapis.com/v1",
  calendars: "https://www.googleapis.com/calendar/v3",
}

export const googleGetContacts = createAsyncThunk<
  Contact[] | GoogleContactResourceItem[] | [],
  undefined | { skipMapping?: boolean },
  { state: ReduxRootState }
>(
  ActionName.GoogleGetContactsProcess,
  async (payload, { getState, dispatch, rejectWithValue, signal }) => {
    let contacts: GoogleContactResourceItem[] = []
    let totalItems = null
    let nextPageToken = null

    while (nextPageToken === null || contacts.length !== totalItems) {
      const { data } = (await requestWrapper<GoogleContactResourceItem>(
        {
          scope: Scope.Contacts,
          axiosProps: {
            url: `${GOOGLE_ENDPOINTS.people}/people/me/connections`,
            params: {
              personFields:
                "names,addresses,phoneNumbers,emailAddresses,biographies,organizations,urls,nicknames",
              pageSize: 1000,
              ...(nextPageToken && {
                pageToken: String(nextPageToken),
              }),
            },
          },
        },
        getState,
        dispatch
      )) as unknown as AxiosResponse<GoogleContacts>

      totalItems = data.totalItems ?? 0
      nextPageToken = data.nextPageToken
      contacts = [...contacts, ...(data.connections ?? [])]
    }

    if (payload?.skipMapping) {
      return contacts ?? []
    }

    return (
      contacts.map((contact: GoogleContactResourceItem) =>
        mapContact(contact)
      ) ?? []
    )
  }
)

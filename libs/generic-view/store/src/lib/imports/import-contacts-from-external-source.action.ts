/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { ActionName } from "../action-names"
import externalProvidersStore from "Core/__deprecated__/renderer/store/external-providers"
import { GoogleContactResourceItem } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { UnifiedContact } from "device/models"

export const importContactsFromExternalSource = createAsyncThunk<
  UnifiedContact[],
  undefined,
  { state: ReduxRootState }
>(
  ActionName.ImportContactsFromExternalSource,
  async (_, { getState, dispatch, rejectWithValue, signal }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000)
    })

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const contacts = (await externalProvidersStore.dispatch.google.getContacts({
      skipMapping: true,
    })) as unknown as GoogleContactResourceItem[]

    return mapGoogleContactsToUnifiedContacts(contacts)
  }
)

const mapGoogleContactsToUnifiedContacts = (
  contacts: GoogleContactResourceItem[]
): UnifiedContact[] => {
  try {
    return contacts.map((contact, index): UnifiedContact => {
      const firstName = contact.names?.find((item) => item.givenName)?.givenName
      const lastName = contact.names?.find(
        (item) => item.familyName
      )?.familyName
      const displayName = contact.names?.find(
        (item) => item.displayName
      )?.displayName
      const displayNamePhoneFallback =
        displayName ?? contact.phoneNumbers?.find((item) => item.value)?.value

      return {
        id: contact.resourceName,
        firstName,
        lastName,
        displayName: displayName || displayNamePhoneFallback || "",
        phoneNumbers:
          contact.phoneNumbers?.map((item) => {
            return {
              value: item.value,
              type: item.type,
            }
          }) ?? [],
      }
    })
  } catch {
    return []
  }
}

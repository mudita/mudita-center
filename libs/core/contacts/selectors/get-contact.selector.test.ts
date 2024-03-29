/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { Contact, contactsReducer, initialState } from "Core/contacts/reducers"
import { getContactSelector } from "Core/contacts/selectors/get-contact.selector"

describe("`getContactSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contacts: contactsReducer(initialState, {} as any),
    } as ReduxRootState
    expect(getContactSelector("1")(state)).toBeUndefined()
  })

  test("when contacts are loaded selector returns properly contact", () => {
    const contact: Contact = {
      id: "0",
      firstName: "Sławomir",
      lastName: "Borewicz",
      primaryPhoneNumber: "+71195069214",
      secondaryPhoneNumber: "",
      email: "example@mudita.com",
      note: "sapiente rem dignissimos sunt",
      ice: false,
      favourite: false,
      firstAddressLine: "Malczewskiego 3, Warszawa",
      secondAddressLine: "",
    }
    const state = {
      contacts: contactsReducer(
        {
          ...initialState,
          collection: [contact.id],
          db: {
            [contact.id]: contact,
          },
        },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any
      ),
    } as ReduxRootState
    expect(getContactSelector(contact.id)(state)).toEqual(contact)
  })
})

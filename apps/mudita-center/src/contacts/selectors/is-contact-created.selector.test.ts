/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Contact, contactsReducer, initialState } from "App/contacts/reducers"
import { isContactCreatedSelector } from "App/contacts/selectors/is-contact-created.selector"

describe("`isContactCreatedSelector` selector", () => {
  test("when initial state is set selector returns undefined", () => {
    const state = {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contacts: contactsReducer(initialState, {} as any),
    } as ReduxRootState
    expect(isContactCreatedSelector("0")(state)).toBeFalsy()
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
      blocked: false,
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
    expect(isContactCreatedSelector("0")(state)).toBeTruthy()
  })
})

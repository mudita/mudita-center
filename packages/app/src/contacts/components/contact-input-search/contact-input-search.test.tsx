/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {isItemMatching} from "App/contacts/components/contact-input-search/contact-input-search.component"
import { Contact } from "App/contacts/store/contacts.type"

const defaultProps = {
    contact: 
    {
        id: "0",
        firstName: "Sławomir",
        lastName: "Borewicz",
        primaryPhoneNumber: "+71 195 069 214",
        secondaryPhoneNumber: "",
        email: "example@mudita.com",
        note: "sapiente rem dignissimos sunt",
        ice: false,
        favourite: false,
        blocked: false,
        firstAddressLine: "Malczewskiego 3, Warszawa",
        secondAddressLine: "",
    } as Contact,
}

test("isItemMatching returns true when search string in email", () => {
    const searchString = "example"
    const result = isItemMatching(defaultProps.contact, searchString)
    expect(result).toBe(true)
})

test("isItemMatching returns true when search string in primaryPhoneNumber", () => {
    const searchString = "069"
    const result = isItemMatching(defaultProps.contact, searchString)
    expect(result).toBe(true)
})

test("isItemMatching returns false when no match ", () => {
    const searchString = "000"
    const result = isItemMatching(defaultProps.contact, searchString)
    expect(result).toBe(false)
})
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { applyValidationRulesToImportedContacts } from "App/contacts/helpers/apply-validation-rules-to-imported-contacts/apply-validation-rules-to-imported-contacts"
import { NewContact } from "App/contacts/reducers"

const contacts: NewContact[] = [
  {
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
  },
  {
    firstName: undefined,
    lastName: undefined,
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
  {
    firstName: "veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeryLongFirstName",
    lastName: "veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeryLongLastName",
    primaryPhoneNumber: "+71 195 069 214",
    secondaryPhoneNumber: "",
    email: "example@mudita.com",
    note: "sapiente rem dignissimos sunt",
    ice: false,
    favourite: false,
    blocked: false,
    firstAddressLine: "Malczewskiego 3, Warszawa",
    secondAddressLine: "",
  },
]

test("contacts are mapped according to validation rules", () => {
  expect(applyValidationRulesToImportedContacts(contacts))
    .toMatchInlineSnapshot(`
    Array [
      Object {
        "blocked": false,
        "email": "example@mudita.com",
        "favourite": false,
        "firstAddressLine": "Malczewskiego 3, Warszawa",
        "firstName": "Sławomir",
        "ice": false,
        "lastName": "Borewicz",
        "note": "sapiente rem dignissimos sunt",
        "primaryPhoneNumber": "+71 195 069 214",
        "secondAddressLine": "",
        "secondaryPhoneNumber": "",
      },
      Object {
        "blocked": false,
        "email": "example@mudita.com",
        "favourite": false,
        "firstAddressLine": "Malczewskiego 3, Warszawa",
        "firstName": undefined,
        "ice": false,
        "lastName": undefined,
        "note": "sapiente rem dignissimos sunt",
        "primaryPhoneNumber": "+71 195 069 214",
        "secondAddressLine": "",
        "secondaryPhoneNumber": "",
      },
      Object {
        "blocked": false,
        "email": "example@mudita.com",
        "favourite": false,
        "firstAddressLine": "Malczewskiego 3, Warszawa",
        "firstName": "veeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "ice": false,
        "lastName": "veeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "note": "sapiente rem dignissimos sunt",
        "primaryPhoneNumber": "+71 195 069 214",
        "secondAddressLine": "",
        "secondaryPhoneNumber": "",
      },
    ]
  `)
})

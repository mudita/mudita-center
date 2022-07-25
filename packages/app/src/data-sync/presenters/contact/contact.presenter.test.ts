/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactPresenter } from "App/data-sync/presenters"
import {
  ContactAddressEntity,
  ContactInput,
  ContactNameEntity,
  ContactNumberEntity,
} from "App/data-sync/types"

const contactEntities: (
  | ContactNameEntity
  | ContactNumberEntity
  | ContactAddressEntity
)[] = [
  { _id: "1", contact_id: "1", address: "", note: "", mail: "" },
  {
    _id: "2",
    contact_id: "2",
    address: "80283 Dashawn Mews",
    note: "",
    mail: "",
  },
  {
    _id: "3",
    contact_id: "3",
    address: "043 Braulio Cape\nLake Georgette",
    note: "",
    mail: "",
  },
]

test("`findRecords` method return records by `contactId`", async () => {
  const presenter = new ContactPresenter()
  const records = presenter.findRecords(contactEntities, "1")
  expect(records).toHaveLength(1)
  expect(records).toEqual([contactEntities[0]])
})

test("`serializeRecord` serialize record properly", async () => {
  const contactNameEntity: ContactNameEntity = {
    _id: "4",
    contact_id: "4",
    name_primary: "Theron",
    name_alternative: "Paucek",
  }

  const values: string[][] = [["4", "4", "Theron", "Paucek"]]

  const columns: string[] = [
    "_id",
    "contact_id",
    "name_primary",
    "name_alternative",
  ]

  const presenter = new ContactPresenter()
  const records = presenter.serializeRecord<ContactNameEntity>(values, columns)
  expect(records).toHaveLength(1)
  expect(records).toEqual([contactNameEntity])
})

describe("When contact isn't belongs to any group", () => {
  test("`serializeToObject` serialize record properly", async () => {
    const contactInput: ContactInput = {
      contacts: {
        columns: [
          "_id",
          "name_id",
          "numbers_id",
          "ring_id",
          "address_id",
          "speeddial",
        ],
        values: [["4", "4", "5", "4", "4", ""]],
      },
      contact_name: {
        columns: ["_id", "contact_id", "name_primary", "name_alternative"],
        values: [["4", "4", "Theron", "Paucek"]],
      },
      contact_number: {
        columns: ["_id", "contact_id", "number_user", "number_e164", "type"],
        values: [["5", "4", "+91898402777", "", "0"]],
      },
      contact_address: {
        columns: ["_id", "contact_id", "address", "note", "mail"],
        values: [["4", "4", "Kochmouth", "", ""]],
      },
      contact_groups: {
        columns: ["_id", "name"],
        values: [
          ["1", "Favourites"],
          ["2", "ICE"],
          ["3", "Blocked"],
          ["4", "Temporary"],
        ],
      },
      contact_match_groups: {
        columns: ["_id", "contact_id", "group_id"],
        values: [],
      },
    }

    const presenter = new ContactPresenter()
    const contactObjects = presenter.serializeToObject(contactInput)
    expect(contactObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "email": "",
          "favourite": false,
          "firstAddressLine": "",
          "firstName": "Theron",
          "id": "4",
          "lastName": "Paucek",
          "note": "",
          "primaryPhoneNumber": "+91898402777",
          "secondAddressLine": "Kochmouth",
          "secondaryPhoneNumber": "",
        },
      ]
    `)
  })
})

describe("When contact isn't belongs to `Favourites` group", () => {
  test("`serializeToObject` serialize record properly", async () => {
    const contactInput: ContactInput = {
      contacts: {
        columns: [
          "_id",
          "name_id",
          "numbers_id",
          "ring_id",
          "address_id",
          "speeddial",
        ],
        values: [["4", "4", "5", "4", "4", ""]],
      },
      contact_name: {
        columns: ["_id", "contact_id", "name_primary", "name_alternative"],
        values: [["4", "4", "Theron", "Paucek"]],
      },
      contact_number: {
        columns: ["_id", "contact_id", "number_user", "number_e164", "type"],
        values: [["5", "4", "+91898402777", "", "0"]],
      },
      contact_address: {
        columns: ["_id", "contact_id", "address", "note", "mail"],
        values: [["4", "4", "Kochmouth", "", ""]],
      },
      contact_groups: {
        columns: ["_id", "name"],
        values: [
          ["1", "Favourites"],
          ["2", "ICE"],
          ["3", "Blocked"],
          ["4", "Temporary"],
        ],
      },
      contact_match_groups: {
        columns: ["_id", "contact_id", "group_id"],
        values: [["1", "4", "1"]],
      },
    }

    const presenter = new ContactPresenter()
    const contactObjects = presenter.serializeToObject(contactInput)
    expect(contactObjects).toMatchInlineSnapshot(`
      Array [
        Object {
          "email": "",
          "favourite": true,
          "firstAddressLine": "",
          "firstName": "Theron",
          "id": "4",
          "lastName": "Paucek",
          "note": "",
          "primaryPhoneNumber": "+91898402777",
          "secondAddressLine": "Kochmouth",
          "secondaryPhoneNumber": "",
        },
      ]
    `)
  })
})

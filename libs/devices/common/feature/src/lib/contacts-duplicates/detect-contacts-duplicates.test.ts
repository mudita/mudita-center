/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { detectContactsDuplicates } from "./detect-contacts-duplicates"
import { Contact, ContactSource, PhoneNumberType } from "devices/common/models"

const createContact = (
  contactId: string,
  phoneNumbers: string[] = []
): Contact => ({
  contactId,
  phoneNumbers: phoneNumbers.map((phoneNumber, index) => ({
    id: `${contactId}-phone-${index}`,
    phoneNumber,
    unifiedPhoneNumber: phoneNumber,
    phoneType: PhoneNumberType.Mobile,
  })),
  accountName: ContactSource.MCImportCsv,
  entityType: "contact",
  searchName: "",
  sortField: "",
})

describe("detectContactsDuplicates", () => {
  it("returns empty array when no contacts are provided", () => {
    const result = detectContactsDuplicates([])
    expect(result).toEqual([])
  })

  it("returns empty array when single contact is provided", () => {
    const contacts = [createContact("1", ["123456789"])]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("returns empty array when contacts have no phone numbers", () => {
    const contacts = [createContact("1"), createContact("2")]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("returns empty array when contacts have different phone numbers", () => {
    const contacts = [
      createContact("1", ["111111111"]),
      createContact("2", ["222222222"]),
      createContact("3", ["333333333"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("detects duplicates when two contacts have the same phone number", () => {
    const contacts = [
      createContact("1", ["123456789"]),
      createContact("2", ["123456789"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "2",
        toMerge: ["1"],
      },
    ])
  })

  it("detects duplicates when contacts have one matching phone number among multiple", () => {
    const contacts = [
      createContact("1", ["111111111", "123456789"]),
      createContact("2", ["222222222", "123456789"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "2",
        toMerge: ["1"],
      },
    ])
  })

  it("keeps the newest contact (higher ID) when detecting duplicates", () => {
    const contacts = [
      createContact("aaa", ["123456789"]),
      createContact("zzz", ["123456789"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "zzz",
        toMerge: ["aaa"],
      },
    ])
  })

  it("groups multiple duplicates under a single toKeep entry", () => {
    const contacts = [
      createContact("1", ["123456789"]),
      createContact("2", ["123456789"]),
      createContact("3", ["123456789"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "3",
        toMerge: ["2", "1"],
      },
    ])
  })

  it("handles multiple separate duplicate groups", () => {
    const contacts = [
      createContact("1", ["111111111"]),
      createContact("2", ["111111111"]),
      createContact("3", ["222222222"]),
      createContact("4", ["222222222"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "4",
        toMerge: ["3"],
      },
      {
        toKeep: "2",
        toMerge: ["1"],
      },
    ])
  })

  it("ignores phone numbers beyond the first two", () => {
    const contactWithThreePhones: Contact = {
      contactId: "1",
      phoneNumbers: [
        {
          id: "1-phone-0",
          phoneNumber: "111111111",
          unifiedPhoneNumber: "111111111",
          phoneType: PhoneNumberType.Mobile,
        },
        {
          id: "1-phone-1",
          phoneNumber: "222222222",
          unifiedPhoneNumber: "222222222",
          phoneType: PhoneNumberType.Mobile,
        },
        {
          id: "1-phone-2",
          phoneNumber: "333333333",
          unifiedPhoneNumber: "333333333",
          phoneType: PhoneNumberType.Mobile,
        },
      ],
      accountName: ContactSource.MCImportCsv,
      entityType: "contact",
      searchName: "",
      sortField: "",
    }
    const contacts = [contactWithThreePhones, createContact("2", ["333333333"])]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("ignores phone numbers without unifiedPhoneNumber", () => {
    const contactWithoutUnified: Contact = {
      contactId: "1",
      phoneNumbers: [
        {
          id: "1-phone-0",
          phoneNumber: "123456789",
          unifiedPhoneNumber: undefined,
          phoneType: PhoneNumberType.Mobile,
        },
      ],
      accountName: ContactSource.MCImportCsv,
      entityType: "contact",
      searchName: "",
      sortField: "",
    }
    const contacts = [contactWithoutUnified, createContact("2", ["123456789"])]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("handles contacts with undefined phoneNumbers array", () => {
    const contactWithoutPhones: Contact = {
      contactId: "1",
      phoneNumbers: undefined,
      accountName: ContactSource.MCImportCsv,
      entityType: "contact",
      searchName: "",
      sortField: "",
    }
    const contacts = [contactWithoutPhones, createContact("2", ["123456789"])]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([])
  })

  it("groups all contacts linked through a common contact into one group", () => {
    const contacts = [
      createContact("1", ["111111111"]),
      createContact("2", ["111111111", "222222222"]),
      createContact("3", ["222222222"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result).toEqual([
      {
        toKeep: "3",
        toMerge: ["2", "1"],
      },
    ])
  })

  it("handles numeric string IDs correctly by padding for comparison", () => {
    const contacts = [
      createContact("9", ["123456789"]),
      createContact("10", ["123456789"]),
    ]
    const result = detectContactsDuplicates(contacts)
    expect(result[0].toKeep).toBe("10")
    expect(result[0].toMerge).toEqual(["9"])
  })
})

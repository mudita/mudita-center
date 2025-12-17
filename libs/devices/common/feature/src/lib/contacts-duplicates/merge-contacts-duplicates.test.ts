/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mergeContactsDuplicates } from "./merge-contacts-duplicates"
import {
  Contact,
  ContactSource,
  DuplicateContactsGroup,
  PhoneNumberType,
  EmailAddressType,
} from "devices/common/models"

const createContact = (
  contactId: string,
  options: {
    phoneNumbers?: { phoneNumber: string; unifiedPhoneNumber?: string }[]
    emailAddresses?: { emailAddress: string }[]
  } = {}
): Contact => ({
  contactId,
  phoneNumbers: options.phoneNumbers?.map((phone, index) => ({
    id: `${contactId}-phone-${index}`,
    phoneNumber: phone.phoneNumber,
    unifiedPhoneNumber: phone.unifiedPhoneNumber ?? phone.phoneNumber,
    phoneType: PhoneNumberType.Mobile,
  })),
  emailAddresses: options.emailAddresses?.map((email, index) => ({
    id: `${contactId}-email-${index}`,
    emailAddress: email.emailAddress,
    emailType: EmailAddressType.Home,
  })),
  accountName: ContactSource.MCImportCsv,
  entityType: "contact",
  searchName: "",
  sortField: "",
})

describe("mergeContactsDuplicates", () => {
  it("returns empty arrays when no duplicate groups are provided", () => {
    const result = mergeContactsDuplicates([])
    expect(result).toEqual({ toUpdate: [], toRemove: [] })
  })

  it("returns the kept contact unchanged when it has no contacts to merge", () => {
    const contact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "123456789" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: contact, toMerge: [] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate).toHaveLength(1)
    expect(result.toUpdate[0]).toEqual(contact)
    expect(result.toRemove).toEqual([])
  })

  it("merges phone numbers from duplicate contact into main contact", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111111111" }],
    })
    const duplicateContact = createContact("2", {
      phoneNumbers: [{ phoneNumber: "222222222" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(2)
    expect(result.toUpdate[0].phoneNumbers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ phoneNumber: "111111111" }),
        expect.objectContaining({ phoneNumber: "222222222" }),
      ])
    )
    expect(result.toRemove).toEqual(["2"])
  })

  it("merges email addresses from duplicate contact into main contact", () => {
    const mainContact = createContact("1", {
      emailAddresses: [{ emailAddress: "main@example.com" }],
    })
    const duplicateContact = createContact("2", {
      emailAddresses: [{ emailAddress: "duplicate@example.com" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses).toHaveLength(2)
    expect(result.toUpdate[0].emailAddresses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ emailAddress: "main@example.com" }),
        expect.objectContaining({ emailAddress: "duplicate@example.com" }),
      ])
    )
    expect(result.toRemove).toEqual(["2"])
  })

  it("removes duplicate phone numbers when merging", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "123456789", unifiedPhoneNumber: "123456789" }],
    })
    const duplicateContact = createContact("2", {
      phoneNumbers: [{ phoneNumber: "123456789", unifiedPhoneNumber: "123456789" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(1)
    expect(result.toUpdate[0].phoneNumbers?.[0].phoneNumber).toBe("123456789")
  })

  it("removes duplicate email addresses when merging", () => {
    const mainContact = createContact("1", {
      emailAddresses: [{ emailAddress: "same@example.com" }],
    })
    const duplicateContact = createContact("2", {
      emailAddresses: [{ emailAddress: "same@example.com" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses).toHaveLength(1)
    expect(result.toUpdate[0].emailAddresses?.[0].emailAddress).toBe(
      "same@example.com"
    )
  })

  it("merges multiple duplicate contacts into main contact", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111111111" }],
    })
    const duplicate1 = createContact("2", {
      phoneNumbers: [{ phoneNumber: "222222222" }],
    })
    const duplicate2 = createContact("3", {
      phoneNumbers: [{ phoneNumber: "333333333" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicate1, duplicate2] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(3)
    expect(result.toRemove).toEqual(["2", "3"])
  })

  it("handles multiple duplicate groups", () => {
    const group1Main = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111111111" }],
    })
    const group1Duplicate = createContact("2", {
      phoneNumbers: [{ phoneNumber: "112222222" }],
    })
    const group2Main = createContact("3", {
      phoneNumbers: [{ phoneNumber: "333333333" }],
    })
    const group2Duplicate = createContact("4", {
      phoneNumbers: [{ phoneNumber: "444444444" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: group1Main, toMerge: [group1Duplicate] },
      { toKeep: group2Main, toMerge: [group2Duplicate] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate).toHaveLength(2)
    expect(result.toRemove).toEqual(["2", "4"])
  })

  it("preserves main contact properties when merging", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      firstName: "John",
      lastName: "Doe",
      company: "ACME",
      phoneNumbers: [
        {
          id: "1-phone-0",
          phoneNumber: "111111111",
          unifiedPhoneNumber: "111111111",
          phoneType: PhoneNumberType.Mobile,
        },
      ],
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      firstName: "Jane",
      lastName: "Smith",
      company: "Other Corp",
      phoneNumbers: [
        {
          id: "2-phone-0",
          phoneNumber: "222222222",
          unifiedPhoneNumber: "222222222",
          phoneType: PhoneNumberType.Mobile,
        },
      ],
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].firstName).toBe("John")
    expect(result.toUpdate[0].lastName).toBe("Doe")
    expect(result.toUpdate[0].company).toBe("ACME")
    expect(result.toUpdate[0].contactId).toBe("1")
  })

  it("filters out phone numbers without phoneNumber value", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111111111" }],
    })
    const duplicateContact: Contact = {
      ...createContact("2"),
      phoneNumbers: [
        {
          id: "2-phone-0",
          phoneNumber: "",
          unifiedPhoneNumber: "",
          phoneType: PhoneNumberType.Mobile,
        },
      ],
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(1)
  })

  it("filters out phone numbers without unifiedPhoneNumber value", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111111111" }],
    })
    const duplicateContact: Contact = {
      ...createContact("2"),
      phoneNumbers: [
        {
          id: "2-phone-0",
          phoneNumber: "222222222",
          unifiedPhoneNumber: "",
          phoneType: PhoneNumberType.Mobile,
        },
      ],
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(1)
  })

  it("filters out email addresses without emailAddress value", () => {
    const mainContact = createContact("1", {
      emailAddresses: [{ emailAddress: "main@example.com" }],
    })
    const duplicateContact: Contact = {
      ...createContact("2"),
      emailAddresses: [
        {
          id: "2-email-0",
          emailAddress: "",
          emailType: EmailAddressType.Home,
        },
      ],
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses).toHaveLength(1)
  })

  it("handles contacts with undefined phoneNumbers", () => {
    const mainContact = createContact("1")
    const duplicateContact = createContact("2", {
      phoneNumbers: [{ phoneNumber: "222222222" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(1)
    expect(result.toUpdate[0].phoneNumbers?.[0].phoneNumber).toBe("222222222")
  })

  it("handles contacts with undefined emailAddresses", () => {
    const mainContact = createContact("1")
    const duplicateContact = createContact("2", {
      emailAddresses: [{ emailAddress: "test@example.com" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses).toHaveLength(1)
    expect(result.toUpdate[0].emailAddresses?.[0].emailAddress).toBe(
      "test@example.com"
    )
  })

  it("prioritizes main contact phone numbers over duplicates", () => {
    const mainContact = createContact("1", {
      phoneNumbers: [{ phoneNumber: "111", unifiedPhoneNumber: "unified" }],
    })
    const duplicateContact = createContact("2", {
      phoneNumbers: [{ phoneNumber: "222", unifiedPhoneNumber: "unified" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers).toHaveLength(1)
    expect(result.toUpdate[0].phoneNumbers?.[0].phoneNumber).toBe("111")
  })

  it("prioritizes main contact email addresses over duplicates", () => {
    const mainContact = createContact("1", {
      emailAddresses: [{ emailAddress: "MAIN@example.com" }],
    })
    const duplicateContact = createContact("2", {
      emailAddresses: [{ emailAddress: "MAIN@example.com" }],
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses).toHaveLength(1)
    expect(result.toUpdate[0].emailAddresses?.[0].id).toBe("1-email-0")
  })
})

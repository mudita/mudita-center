/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mergeContactsDuplicates } from "./merge-contacts-duplicates"
import {
  AddressType,
  Contact,
  ContactSource,
  DuplicateContactsGroup,
  EmailAddressType,
  PhoneNumberType,
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
      phoneNumbers: [
        { phoneNumber: "123456789", unifiedPhoneNumber: "123456789" },
      ],
    })
    const duplicateContact = createContact("2", {
      phoneNumbers: [
        { phoneNumber: "123456789", unifiedPhoneNumber: "123456789" },
      ],
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

  it("fills missing text fields from duplicate contact", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      firstName: "John",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      lastName: "Doe",
      middleName: "Michael",
      namePrefix: "Dr.",
      nameSuffix: "Jr.",
      nickName: "Johnny",
      department: "Engineering",
      workTitle: "Developer",
      sip: "sip:john@example.com",
      website: "https://example.com",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].firstName).toBe("John")
    expect(result.toUpdate[0].lastName).toBe("Doe")
    expect(result.toUpdate[0].middleName).toBe("Michael")
    expect(result.toUpdate[0].namePrefix).toBe("Dr.")
    expect(result.toUpdate[0].nameSuffix).toBe("Jr.")
    expect(result.toUpdate[0].nickName).toBe("Johnny")
    expect(result.toUpdate[0].department).toBe("Engineering")
    expect(result.toUpdate[0].workTitle).toBe("Developer")
    expect(result.toUpdate[0].sip).toBe("sip:john@example.com")
    expect(result.toUpdate[0].website).toBe("https://example.com")
  })

  it("fills missing address from duplicate contact", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      firstName: "John",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      address: {
        streetAddress: "123 Main St",
        city: "New York",
        country: "USA",
        type: AddressType.Home,
      },
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].address).toEqual({
      streetAddress: "123 Main St",
      city: "New York",
      country: "USA",
      type: AddressType.Home,
    })
  })

  it("preserves main contact address over duplicate address", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      address: {
        streetAddress: "Main Street",
        city: "Boston",
        type: AddressType.Home,
      },
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      address: {
        streetAddress: "Other Street",
        city: "Chicago",
        type: AddressType.Work,
      },
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].address).toEqual({
      streetAddress: "Main Street",
      city: "Boston",
      type: AddressType.Home,
    })
  })

  it("fills starred field from duplicate contact when main is not starred", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      starred: false,
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      starred: true,
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].starred).toBe(true)
  })

  it("preserves starred field from main contact when already starred", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      starred: true,
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      starred: false,
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].starred).toBe(true)
  })

  it("always preserves accountName and entityType from main contact", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      accountName: ContactSource.MCImportCsv,
      entityType: "contact",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      accountName: ContactSource.MCImportGoogle,
      entityType: "other-entity",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].accountName).toBe(ContactSource.MCImportCsv)
    expect(result.toUpdate[0].entityType).toBe("contact")
  })

  it("concatenates notes from both contacts with double newline separator", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      notes: "Main contact notes",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      notes: "Duplicate contact notes",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBe(
      "Main contact notes\n\nDuplicate contact notes"
    )
  })

  it("uses main contact notes when duplicate has no notes", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      notes: "Main contact notes",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBe("Main contact notes")
  })

  it("uses duplicate contact notes when main has no notes", () => {
    const mainContact: Contact = {
      ...createContact("1"),
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      notes: "Duplicate contact notes",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBe("Duplicate contact notes")
  })

  it("returns undefined notes when both contacts have no notes", () => {
    const mainContact: Contact = {
      ...createContact("1"),
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBeUndefined()
  })

  it("concatenates notes from multiple duplicate contacts", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      notes: "Note 1",
    }
    const duplicate1: Contact = {
      ...createContact("2"),
      notes: "Note 2",
    }
    const duplicate2: Contact = {
      ...createContact("3"),
      notes: "Note 3",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicate1, duplicate2] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBe("Note 1\n\nNote 2\n\nNote 3")
  })

  it("does not duplicate identical notes", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      notes: "Same notes",
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      notes: "Same notes",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes).toBe("Same notes")
  })

  it("truncates merged notes to 5000 characters", () => {
    const mainNote = "a".repeat(3000)
    const duplicateNote = "b".repeat(3000)
    const mainContact: Contact = {
      ...createContact("1"),
      notes: mainNote,
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
      notes: duplicateNote,
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes?.length).toBe(5000)
  })

  it("truncates single contact notes to 5000 characters", () => {
    const longNote = "a".repeat(6000)
    const mainContact: Contact = {
      ...createContact("1"),
      notes: longNote,
    }
    const duplicateContact: Contact = {
      ...createContact("2"),
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].notes?.length).toBe(5000)
  })

  it("limits merged phone numbers to 500 elements", () => {
    const mainPhones = Array.from({ length: 300 }, (_, i) => ({
      phoneNumber: `1${i.toString().padStart(9, "0")}`,
      unifiedPhoneNumber: `1${i.toString().padStart(9, "0")}`,
    }))
    const duplicatePhones = Array.from({ length: 300 }, (_, i) => ({
      phoneNumber: `2${i.toString().padStart(9, "0")}`,
      unifiedPhoneNumber: `2${i.toString().padStart(9, "0")}`,
    }))
    const mainContact = createContact("1", { phoneNumbers: mainPhones })
    const duplicateContact = createContact("2", {
      phoneNumbers: duplicatePhones,
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].phoneNumbers?.length).toBe(500)
  })

  it("limits merged email addresses to 500 elements", () => {
    const mainEmails = Array.from({ length: 300 }, (_, i) => ({
      emailAddress: `main${i}@example.com`,
    }))
    const duplicateEmails = Array.from({ length: 300 }, (_, i) => ({
      emailAddress: `dup${i}@example.com`,
    }))
    const mainContact = createContact("1", { emailAddresses: mainEmails })
    const duplicateContact = createContact("2", {
      emailAddresses: duplicateEmails,
    })
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicateContact] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].emailAddresses?.length).toBe(500)
  })

  it("merges data from multiple contacts in order", () => {
    const mainContact: Contact = {
      ...createContact("1"),
      firstName: "John",
    }
    const duplicate1: Contact = {
      ...createContact("2"),
      lastName: "Doe",
      company: "First Company",
    }
    const duplicate2: Contact = {
      ...createContact("3"),
      lastName: "Smith",
      company: "Second Company",
      department: "Sales",
    }
    const duplicateGroups: DuplicateContactsGroup[] = [
      { toKeep: mainContact, toMerge: [duplicate1, duplicate2] },
    ]

    const result = mergeContactsDuplicates(duplicateGroups)

    expect(result.toUpdate[0].firstName).toBe("John")
    expect(result.toUpdate[0].lastName).toBe("Doe")
    expect(result.toUpdate[0].company).toBe("First Company")
    expect(result.toUpdate[0].department).toBe("Sales")
  })
})

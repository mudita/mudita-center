/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AddressType,
  ContactSource,
  PhoneNumberType,
} from "devices/common/models"
import { mapVcardContacts } from "./map-vcard-contacts"

const rawVCard = (version: string, ...lines: string[]) =>
  ["BEGIN:VCARD", `VERSION:${version}`, ...lines, "END:VCARD", ""].join("\r\n")

const vCard = (version: string, ...lines: string[]) =>
  rawVCard(version, "N:Doe;John;;;", "FN:John Doe", ...lines)

describe("mapVcardContacts", () => {
  describe.each([
    ["2.1", "ADR;HOME;PREF:"],
    ["3.0", "ADR;type=HOME;type=pref:"],
    ["4.0", "ADR;TYPE=home,pref:"],
  ])("vCard %s addresses", (version, adrPrefix) => {
    it("maps ADR components onto the contact address fields", () => {
      const [contact] = mapVcardContacts(
        vCard(
          version,
          `${adrPrefix}PO Box 1;Apt 1;1 Example St.;Example City;TN;12345;Example Country`
        )
      )

      expect(contact.addresses).toEqual([
        {
          poBox: "PO Box 1",
          extendedAddress: "Apt 1",
          streetAddress: "1 Example St.",
          city: "Example City",
          region: "TN",
          postalCode: "12345",
          country: "Example Country",
          type: AddressType.Home,
        },
      ])
      expect(contact.importSource).toBe(ContactSource.MCImportVCard)
    })

    it("maps an address exported without a po box and an extended address", () => {
      const [contact] = mapVcardContacts(
        vCard(
          version,
          `${adrPrefix};;1 Example St.;Example City EX;12345;;Example Country`
        )
      )

      expect(contact.addresses).toEqual([
        {
          poBox: "",
          extendedAddress: "",
          streetAddress: "1 Example St.",
          city: "Example City EX",
          region: "12345",
          postalCode: "",
          country: "Example Country",
          type: AddressType.Home,
        },
      ])
    })

    it("drops an address without any component", () => {
      const [contact] = mapVcardContacts(vCard(version, `${adrPrefix};;;;;;`))

      expect(contact.addresses).toEqual([])
    })
  })

  it("returns no contacts for data without a supported version", () => {
    expect(
      mapVcardContacts("BEGIN:VCARD\r\nFN:John Doe\r\nEND:VCARD\r\n")
    ).toEqual([])
  })
  describe("vCard 4.0 RFC 9554 address components", () => {
    // Components of the ADR structured value, in the order defined by
    // RFC 9554 sec. 2.1.
    const ADR_COMPONENTS = [
      "poBox",
      "secondStreetAddress",
      "streetAddress",
      "city",
      "state",
      "zipCode",
      "country",
      "room",
      "apartment",
      "floor",
      "streetNumber",
      "streetName",
      "building",
      "block",
      "subdistrict",
      "district",
      "landmark",
      "direction",
    ] as const

    const mapAddress = (
      components: Partial<Record<(typeof ADR_COMPONENTS)[number], string>>
    ) => {
      const value = ADR_COMPONENTS.map((name) => components[name] ?? "").join(
        ";"
      )
      const [contact] = mapVcardContacts(vCard("4.0", `ADR;TYPE=home:${value}`))
      return contact.addresses[0]
    }

    it("maps the new components onto the contact address fields", () => {
      expect(
        mapAddress({
          poBox: "PO Box 1",
          streetAddress: "combined value written for backwards compatibility",
          city: "Example City",
          state: "EX",
          zipCode: "12345",
          country: "Example Country",
          room: "Room 1",
          apartment: "Apt 2",
          floor: "Floor 3",
          streetNumber: "1",
          streetName: "Example St.",
          building: "Building A",
          block: "Block B",
          subdistrict: "Subdistrict A",
          district: "District B",
          direction: "north",
        })
      ).toEqual({
        poBox: "PO Box 1",
        streetAddress: "1 Example St., Building A, Block B, north",
        extendedAddress: "Room 1, Apt 2, Floor 3",
        city: "Subdistrict A, District B, Example City",
        region: "EX",
        postalCode: "12345",
        country: "Example Country",
        type: AddressType.Home,
      })
    })

    it("ignores the street component when new components are present", () => {
      // RFC 9554 sec. 2.1: readers SHOULD ignore the street component during
      // reads if the value contains any of the new components.
      const address = mapAddress({
        streetAddress: "a stale value the producer left behind",
        streetNumber: "1",
        streetName: "Example St.",
      })

      expect(address.streetAddress).toBe("1 Example St.")
    })

    it("keeps the extended address alongside a new floor component", () => {
      const address = mapAddress({
        secondStreetAddress: "Apt 2",
        floor: "Floor 3",
      })

      expect(address.extendedAddress).toBe("Apt 2, Floor 3")
    })

    it("keeps an independent extended address with all new address components", () => {
      const address = mapAddress({
        secondStreetAddress: "Side entrance",
        room: "Room 1",
        apartment: "Apt 2",
        floor: "Floor 3",
        streetNumber: "1",
        streetName: "Example St.",
        building: "Building A",
        block: "Block B",
        subdistrict: "Subdistrict A",
        district: "District B",
        landmark: "Example Landmark",
        direction: "north",
      })

      expect(address.extendedAddress).toBe(
        "Side entrance, Room 1, Apt 2, Floor 3"
      )
    })

    it.each(["room", "apartment", "floor"] as const)(
      "does not repeat an extended address equal to the %s component",
      (component) => {
        const address = mapAddress({
          secondStreetAddress: "Suite 1\\, 2",
          [component]: "Suite 1\\, 2",
        })

        expect(address.extendedAddress).toBe("Suite 1, 2")
      }
    )

    it("keeps the street when a new component says nothing about it", () => {
      // RFC 9554 asks a reader to ignore the street component, but only a
      // component that actually describes the street can replace it.
      const address = mapAddress({
        streetAddress: "1 Example St.",
        city: "Example City",
        district: "District B",
      })

      expect(address).toMatchObject({
        streetAddress: "1 Example St.",
        city: "District B, Example City",
      })
    })

    it("appends a cardinal direction to the street instead of replacing it", () => {
      const address = mapAddress({
        streetAddress: "1 Example St.",
        direction: "north",
      })

      expect(address.streetAddress).toBe("1 Example St., north")
    })

    it("falls back to the landmark when no street name or number is given", () => {
      const address = mapAddress({
        streetAddress: "a stale value the producer left behind",
        landmark: "Example Landmark",
      })

      expect(address.streetAddress).toBe("Example Landmark")
    })

    it("reads a backwards compatible address the same way as a legacy one", () => {
      // The example from RFC 9554 sec. 2.1 carries both the new components and
      // the combined street value, so it must read like the RFC 6350 form.
      const [withComponents] = mapVcardContacts(
        vCard(
          "4.0",
          "ADR;TYPE=home:;;123 Main Street;Any Town;CA;91921-1234;U.S.A" +
            ";;;;123;Main Street;;;;;;"
        )
      )
      const [legacy] = mapVcardContacts(
        vCard(
          "4.0",
          "ADR;TYPE=home:;;123 Main Street;Any Town;CA;91921-1234;U.S.A"
        )
      )

      expect(withComponents.addresses).toEqual(legacy.addresses)
    })

    it("keeps the legacy street address when no new component is present", () => {
      const address = mapAddress({
        secondStreetAddress: "Apt 1",
        streetAddress: "1 Example St.",
        city: "Example City",
      })

      expect(address).toMatchObject({
        streetAddress: "1 Example St.",
        extendedAddress: "Apt 1",
        city: "Example City",
      })
    })
  })
})

describe.each(["2.1", "3.0", "4.0"])(
  "mapVcardContacts phone types (vCard %s)",
  (version) => {
    const cellType = version === "2.1" ? "CELL" : "TYPE=CELL"

    // Every version names a mobile number "cell" while the contact model
    // calls it "mobile" (vCard 2.1 TEL, RFC 2426 sec. 3.3.1,
    // RFC 6350 sec. 6.4.1).
    it("maps a cell number to the mobile type", () => {
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", `TEL;${cellType}:123`)
      )

      expect(contact.phoneNumbers).toEqual([
        { value: "123", type: PhoneNumberType.Mobile, preference: undefined },
      ])
    })

    it("still maps home and work", () => {
      const homeType = version === "2.1" ? "HOME" : "TYPE=HOME"
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", `TEL;${homeType}:123`)
      )

      expect(contact.phoneNumbers[0].type).toBe(PhoneNumberType.Home)
    })

    it("strips the scheme of a tel URI", () => {
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", `TEL;${cellType}:tel:123456789`)
      )

      expect(contact.phoneNumbers[0].value).toBe("123456789")
    })
  }
)

describe.each(["2.1", "3.0", "4.0"])(
  "mapVcardContacts organizations (vCard %s)",
  (version) => {
    it("keeps a title that has no organization next to it", () => {
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", "TITLE:Example Title")
      )

      expect(contact.organizations).toEqual([{ title: "Example Title" }])
    })

    it("falls back to the role when there is no title", () => {
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", "ORG:Example Org", "ROLE:Example Role")
      )

      expect(contact.organizations).toEqual([
        { name: "Example Org", title: "Example Role" },
      ])
    })

    it("keeps every title even when there are fewer organizations", () => {
      const [contact] = mapVcardContacts(
        vCard(
          version,
          "N:Doe;John;;;",
          "ORG:Example Org",
          "TITLE:CTO",
          "TITLE:Founder"
        )
      )

      expect(contact.organizations.map((o) => o.title)).toEqual([
        "CTO",
        "Founder",
      ])
    })

    it("keeps every organizational unit as the department", () => {
      const [contact] = mapVcardContacts(
        vCard(version, "N:Doe;John;;;", "ORG:Example Org;RnD;Team A")
      )

      expect(contact.organizations[0]).toMatchObject({
        name: "Example Org",
        department: "RnD, Team A",
      })
    })
  }
)

describe("mapVcardContacts robustness", () => {
  it("imports a file written with lower case property names", () => {
    const contacts = mapVcardContacts(
      "begin:vcard\r\nversion:3.0\r\nn:Doe;John;;;\r\ntel;type=home:123\r\nend:vcard\r\n"
    )

    expect(contacts).toHaveLength(1)
    expect(contacts[0].lastName).toBe("Doe")
    expect(contacts[0].phoneNumbers[0].type).toBe(PhoneNumberType.Home)
  })

  it("reads every card with the version it declares itself", () => {
    const contacts = mapVcardContacts(
      rawVCard("3.0", "N:Doe;John;;;", "TEL;TYPE=HOME:1") +
        rawVCard("2.1", "N:Roe;Jane;;;", "TEL;HOME:2")
    )

    expect(contacts.map((c) => c.lastName)).toEqual(["Doe", "Roe"])
    expect(contacts.map((c) => c.phoneNumbers[0].type)).toEqual([
      PhoneNumberType.Home,
      PhoneNumberType.Home,
    ])
  })

  it("skips a card that declares a version the parser does not support", () => {
    const contacts = mapVcardContacts(
      rawVCard("3.0", "N:Doe;John;;;") + rawVCard("9.9", "N:Roe;Jane;;;")
    )

    expect(contacts.map((c) => c.lastName)).toEqual(["Doe"])
  })

  it("falls back to the file version only for a card that declares none", () => {
    const contacts = mapVcardContacts(
      rawVCard("3.0", "N:Doe;John;;;") +
        "BEGIN:VCARD\r\nN:Roe;Jane;;;\r\nEND:VCARD\r\n"
    )

    expect(contacts.map((c) => c.lastName)).toEqual(["Doe", "Roe"])
  })

  it("does not take a type inherited from Object.prototype", () => {
    const [contact] = mapVcardContacts(
      vCard(
        "4.0",
        "TEL;TYPE=constructor:123456789",
        "TEL;TYPE=toString:987654321"
      )
    )

    expect(contact.phoneNumbers.map((p) => p.type)).toEqual([
      PhoneNumberType.Other,
      PhoneNumberType.Other,
    ])
  })

  it("keeps a name holding an apostrophe intact", () => {
    const [contact] = mapVcardContacts(rawVCard("3.0", "N:O'Connor;John;;;"))

    expect(contact).toMatchObject({ lastName: "O'Connor", firstName: "John" })
  })

  it("keeps importing when one card holds an unsupported grouped property", () => {
    const contacts = mapVcardContacts(
      rawVCard("3.0", "N:Doe;John;;;") +
        rawVCard("3.0", "N:Roe;Jane;;;", "item1.BDAY:1990-01-01") +
        rawVCard("3.0", "N:Poe;Alan;;;")
    )

    expect(contacts.map((c) => c.lastName)).toEqual(["Doe", "Roe", "Poe"])
  })

  it("keeps a nickname from overwriting the name in vCard 2.1", () => {
    const [contact] = mapVcardContacts(
      rawVCard("2.1", "NICKNAME:Johnny", "N:Doe;John;;;")
    )

    expect(contact).toMatchObject({
      firstName: "John",
      lastName: "Doe",
      nickName: "Johnny",
    })
  })

  it("keeps the generation out of the honorific suffix twice (vCard 4.0)", () => {
    const [contact] = mapVcardContacts(
      rawVCard("4.0", "N:Doe;John;;Dr.;Jr.,M.D.;;Jr.")
    )

    expect(contact.honorificSuffix).toBe("Jr.,M.D.")
  })

  it("does not repeat a secondary surname already in the family name", () => {
    // RFC 9554 sec. 2.2: a secondary surname is typically written into the
    // family name as well, separated with a space rather than a comma.
    const [contact] = mapVcardContacts(
      rawVCard("4.0", "N:Garcia Perez;Juan;;;;Perez;")
    )

    expect(contact.lastName).toBe("Garcia Perez")
  })

  it("adds a secondary surname that is only written in the new component", () => {
    const [contact] = mapVcardContacts(
      rawVCard("4.0", "N:Garcia;Juan;;;;Perez;")
    )

    expect(contact.lastName).toBe("Garcia Perez")
  })

  it("leaves out the department when the organization has no unit", () => {
    const [contact] = mapVcardContacts(
      rawVCard("3.0", "N:Doe;John;;;", "ORG:Example Org")
    )

    expect(contact.organizations).toEqual([{ name: "Example Org" }])
  })

  it("adds a generation that is only written in the new component", () => {
    const [contact] = mapVcardContacts(rawVCard("4.0", "N:Doe;John;;;;;Jr."))

    expect(contact.honorificSuffix).toBe("Jr.")
  })

  it("unescapes a note and turns an escaped n into a new line", () => {
    const [contact] = mapVcardContacts(
      vCard("3.0", "N:Doe;John;;;", "NOTE:line one\\nline two\\, and more")
    )

    expect(contact.note).toBe("line one\nline two, and more")
  })
})

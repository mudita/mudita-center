/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as fs from "fs"
import * as path from "path"
import { AddressType, PhoneNumberType } from "devices/common/models"
import { mapVcardContacts } from "./map-vcard-contacts"

/**
 * Whole files rather than single lines, because the defects this corpus was
 * built to catch only appear once a file is read end to end: a quoted-printable
 * soft break, a folded line, an apostrophe suppressing a separator.
 *
 * The contents are synthetic but the shapes are not invented - each fixture is
 * modelled on what a given producer documents and emits. Two of them keep the
 * structure of real exports handed over for testing - a Samsung Android 2.1
 * backup and an Apple iOS 3.0 export - with every name, number, address and
 * note replaced; the property order, the parameters, the folding and the
 * quoted-printable encoding are the originals. They are still not captures, so
 * a shape none of them covers can exist in the wild.
 *
 * Most of the assertions below fail against the parser as it stood before these
 * fixtures were added - 25 of 41 did when the corpus was written - so they
 * describe breakage that really happened rather than hypothetical breakage. The
 * rest guard behaviour that already worked, such as reading a grouped property
 * or surviving an embedded photo.
 */
const FIXTURES = path.join(__dirname, "__fixtures__")

const readFixture = (name: string) =>
  fs.readFileSync(path.join(FIXTURES, name), "utf-8")

const importContacts = (name: string) => mapVcardContacts(readFixture(name))

const FIXTURE_NAMES = [
  "v2-1-android-plain.vcf",
  "v2-1-outlook-quoted-printable.vcf",
  "v2-1-samsung-quoted-printable.vcf",
  "v3-0-apple-grouped.vcf",
  "v3-0-apple-ios.vcf",
  "v3-0-google.vcf",
  "v4-0-modern.vcf",
  "mixed-versions.vcf",
]

describe("mapVcardContacts against whole vCard files", () => {
  it.each(FIXTURE_NAMES)("imports %s the same way as before", (name) => {
    expect(importContacts(name)).toMatchSnapshot()
  })

  it("imports every fixture without throwing", () => {
    for (const name of FIXTURE_NAMES) {
      expect(importContacts(name).length).toBeGreaterThan(0)
    }
  })
})

describe("defects the corpus was built to catch", () => {
  describe("vCard 2.1 written by Outlook, quoted-printable", () => {
    const contact = () => importContacts("v2-1-outlook-quoted-printable.vcf")[0]

    it("joins a value broken up with a soft line break", () => {
      // The name used to stop at the break, leaving "Mał=".
      expect(contact().firstName).toBe("Małgorzata")
      expect(contact().organizations[0].department).toBe("Dział Badań")
    })

    it("keeps a note that spans a soft line break", () => {
      expect(contact().note).toBe(
        "Notatka z polskimi znakami: zażółć gęślą jaźń."
      )
    })

    it("reads the whole address, not just the components before the break", () => {
      expect(contact().addresses[0]).toMatchObject({
        streetAddress: "ul. Kwiatowa 5",
        extendedAddress: "m. 3",
        city: "Warszawa",
        postalCode: "00-001",
        country: "Polska",
      })
    })
  })

  describe("vCard 2.1 written by Android, apostrophe in the data", () => {
    const contact = () => importContacts("v2-1-android-plain.vcf")[0]

    it("does not let an apostrophe swallow the lines that follow", () => {
      // "N:O'Connor;..." used to consume the FN line after it, and the
      // address line used to consume the ORG line.
      expect(contact().lastName).toBe("O'Connor")
      expect(contact().honorificSuffix).toBe("")
      expect(contact().organizations[0].name).toBe("O'Connor & Sons")
    })

    it("keeps the components of an address holding an apostrophe apart", () => {
      expect(contact().addresses[0]).toMatchObject({
        streetAddress: "12 O'Connell St.",
        city: "Dublin",
        postalCode: "D01 F5P2",
        country: "Ireland",
      })
    })
  })

  describe("vCard 3.0 written by Google", () => {
    const contact = () => importContacts("v3-0-google.vcf")[0]

    it("puts the street in the street address", () => {
      expect(contact().addresses.map((a) => a.streetAddress)).toEqual([
        "ul. Polna 7, m. 12",
        "al. Jerozolimskie 100",
      ])
    })

    it("unescapes a comma inside an address component", () => {
      // Written by the producer as "ul. Polna 7\\, m. 12".
      expect(contact().addresses[0].streetAddress).toBe("ul. Polna 7, m. 12")
    })

    it("unfolds a long note instead of leaving the fold in the value", () => {
      const note = contact().note ?? ""

      expect(note).not.toMatch(/\n /)
      expect(note).toContain("wymusić zawijanie linii")
    })

    it("does not let a folded value swallow the property after it", () => {
      expect(contact().urls[0].value).toBe("http://example.com/piotr")
    })

    it("keeps every organizational unit", () => {
      expect(contact().organizations[0].department).toBe(
        "Dział Sprzedaży, Zespół B"
      )
    })
  })

  describe("vCard 3.0 written by Apple, grouped properties", () => {
    const contact = () => importContacts("v3-0-apple-grouped.vcf")[0]

    it("reads a grouped property", () => {
      expect(contact().emailAddresses[0].value).toBe("anna@example.com")
    })

    it("puts the street in the street address", () => {
      // The producer merged the locality with the region and shifted the
      // postal code, which is read positionally and left as written.
      expect(contact().addresses[0]).toMatchObject({
        streetAddress: "111 White St.",
        city: "Nashville TN",
        region: "37209",
        postalCode: "",
        type: AddressType.Home,
      })
    })

    it("is not derailed by an embedded photo", () => {
      expect(contact().lastName).toBe("White")
      expect(contact().organizations[0].name).toBe("Example Inc.")
    })
  })

  describe("vCard 2.1 backed up by Samsung, every character in hex", () => {
    const contacts = () => importContacts("v2-1-samsung-quoted-printable.vcf")

    it("decodes a name the producer broke with a soft line break", () => {
      // The producer encodes every character, not only the non-ASCII ones,
      // and wraps the result mid sequence.
      expect(contacts()[0].lastName).toBe("Østdalen-Vikeså")
      expect(contacts()[0].firstName).toBe("Kjetil Andreas")
    })

    it("decodes a note the producer broke mid word", () => {
      expect(contacts()[0].note).toBe("Møtte på eksempeldag EKSEMPEL")
    })

    it("reads an organization and a title encoded the same way", () => {
      expect(contacts()[1].organizations[0]).toMatchObject({
        name: "Eksempel AS",
        department: "Avdeling Bergen",
        title: "Prosjektleder",
      })
    })
  })

  describe("vCard 3.0 exported by Apple on iOS", () => {
    const contacts = () => importContacts("v3-0-apple-ios.vcf")

    it("unfolds an address the producer wrapped", () => {
      expect(contacts()[0].addresses[0]).toMatchObject({
        streetAddress: "1001  Example Street",
        city: "Example City",
        postalCode: "94965",
        country: "USA",
      })
    })

    it("does not let an apostrophe in a note swallow what follows", () => {
      // BDAY and REV used to be appended to the note of this contact.
      expect(contacts()[2].note).toBe(
        "Plays on Cole's Little League Baseball Team\n"
      )
    })

    it("reads an organization written with a trailing separator", () => {
      expect(contacts()[3].organizations[0]).toMatchObject({
        name: "Example Consulting",
        title: "Producer",
      })
    })

    it("reads a grouped url", () => {
      expect(contacts()[3].urls[0].value).toBe("www.example.com")
    })

    it("reads a card whose name holds only an email address", () => {
      expect(contacts()[4].firstName).toBe("fifth@example.com")
    })
  })

  describe("vCard 4.0", () => {
    const contact = () => importContacts("v4-0-modern.vcf")[0]

    it("puts the street in the street address", () => {
      expect(contact().addresses[0]).toMatchObject({
        streetAddress: "Beispielstr. 1",
        city: "Berlin",
        postalCode: "10115",
      })
    })

    it("unescapes a note", () => {
      expect(contact().note).toBe(
        "Hinweis mit Semikolon; und Komma, sowie Zeilenumbruch.\nZweite Zeile."
      )
    })

    it("reads the number and the extension of a tel URI", () => {
      expect(contact().phoneNumbers[1]).toMatchObject({
        value: "+49-30-7654321",
        type: PhoneNumberType.Work,
      })
    })
  })

  describe("across every version", () => {
    it.each([
      ["v2-1-outlook-quoted-printable.vcf", "+48 601 234 567"],
      ["v2-1-android-plain.vcf", "+353 86 123 4567"],
      ["v3-0-google.vcf", "+48 602 345 678"],
      ["v3-0-apple-grouped.vcf", "+1 (555) 010-0201"],
      ["v2-1-samsung-quoted-printable.vcf", "94050002"],
      ["v3-0-apple-ios.vcf", "(408) 555-0103"],
      ["v4-0-modern.vcf", "+49-30-1234567"],
    ])("maps the cell number of %s to the mobile type", (name, number) => {
      // Every version calls a mobile number "cell"; the contact model calls
      // it "mobile", and the two used not to meet.
      const mobile = importContacts(name)
        .flatMap((contact) => contact.phoneNumbers)
        .find((phone) => phone.value === number)

      expect(mobile?.type).toBe(PhoneNumberType.Mobile)
    })

    it("reads a file that concatenates exports of different versions", () => {
      const contacts = importContacts("mixed-versions.vcf")

      expect(contacts.map((contact) => contact.lastName)).toEqual([
        "Nowak",
        "O'Connor",
        "Smith",
      ])
    })
  })
})

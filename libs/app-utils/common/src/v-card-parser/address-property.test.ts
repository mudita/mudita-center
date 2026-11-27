/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const buildVCard = (version: VCardVersion, adrLines: string[]) =>
  [
    "BEGIN:VCARD",
    `VERSION:${version}`,
    "FN:John Doe",
    ...adrLines,
    "END:VCARD",
    "",
  ].join("\r\n")

const parseAddresses = (version: VCardVersion, ...adrLines: string[]) =>
  new VCardParser(version).parse(buildVCard(version, adrLines))[0].ADR ?? []

// Narrowed to 4.0 so that the components added by RFC 9554 are typed.
const parseV40Addresses = (...adrLines: string[]) =>
  new VCardParser(VCardVersion.v40).parse(
    buildVCard(VCardVersion.v40, adrLines)
  )[0].ADR ?? []

// ADR keeps the same 7 components in every vCard version:
// po box; extended address; street address; locality; region; postal code; country
// (vCard 2.1 §2.3.1, RFC 2426 §3.2.1, RFC 6350 §6.3.1)
const homePrefAddress = {
  [VCardVersion.v21]: "ADR;HOME;PREF:",
  [VCardVersion.v30]: "ADR;type=HOME;type=pref:",
  [VCardVersion.v40]: "ADR;TYPE=home,pref:",
}

describe.each([VCardVersion.v21, VCardVersion.v30, VCardVersion.v40])(
  "ADR property (vCard %s)",
  (version) => {
    const prefix = homePrefAddress[version]

    it("maps every component to its position defined by the specification", () => {
      const addresses = parseAddresses(
        version,
        `${prefix}PO Box 1;Apt 1;1 Example St.;Example City;TN;12345;Example Country`
      )

      expect(addresses).toEqual([
        {
          value: {
            poBox: "PO Box 1",
            secondStreetAddress: "Apt 1",
            streetAddress: "1 Example St.",
            city: "Example City",
            state: "TN",
            zipCode: "12345",
            country: "Example Country",
          },
          parameters: { TYPE: ["home", "pref"] },
        },
      ])
    })

    it("does not swap the street address with the extended address", () => {
      const [address] = parseAddresses(
        version,
        `${prefix};Apt 1;1 Example St.;;;;`
      )

      expect(address.value.streetAddress).toBe("1 Example St.")
      expect(address.value.secondStreetAddress).toBe("Apt 1")
    })

    it("leaves omitted components empty", () => {
      const [address] = parseAddresses(
        version,
        `${prefix};;1 Example St.;Example City;TN;12345;Example Country`
      )

      expect(address.value.poBox).toBe("")
      expect(address.value.secondStreetAddress).toBe("")
    })

    it("maps components positionally even when the producer misplaced them", () => {
      // Real-world export that merged locality with region and shifted the
      // postal code into the region slot. The parser must stay positional
      // instead of guessing what the producer meant.
      const [address] = parseAddresses(
        version,
        `${prefix};;1 Example St.;Example City EX;12345;;Example Country`
      )

      expect(address.value).toEqual({
        poBox: "",
        secondStreetAddress: "",
        streetAddress: "1 Example St.",
        city: "Example City EX",
        state: "12345",
        zipCode: "",
        country: "Example Country",
      })
    })

    it("keeps every address of a contact", () => {
      const addresses = parseAddresses(
        version,
        `${prefix};;1 Example St.;Example City;TN;12345;Example Country`,
        `${prefix};;2 Example St.;Other City;TN;54321;Example Country`
      )

      expect(addresses.map((a) => a.value.streetAddress)).toEqual([
        "1 Example St.",
        "2 Example St.",
      ])
    })
  }
)

// Components of the ADR structured value, in the order defined by
// RFC 9554 sec. 2.1 (the first seven are the original RFC 6350 ones).
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

type AdrComponents = Partial<Record<(typeof ADR_COMPONENTS)[number], string>>

const adrLine = (components: AdrComponents) =>
  `ADR;TYPE=home:${ADR_COMPONENTS.map((name) => components[name] ?? "").join(
    ";"
  )}`

describe("ADR property (vCard 4.0, RFC 9554 components)", () => {
  it("maps all eighteen components to their position", () => {
    const components: Required<AdrComponents> = {
      poBox: "PO Box 1",
      secondStreetAddress: "Apt 1",
      streetAddress: "1 Example St.",
      city: "Example City",
      state: "CA",
      zipCode: "12345",
      country: "Example Country",
      room: "Room 1",
      apartment: "Apt 2",
      floor: "Floor 3",
      streetNumber: "123",
      streetName: "Example St.",
      building: "Building A",
      block: "Block B",
      subdistrict: "Subdistrict A",
      district: "District B",
      landmark: "Example Landmark",
      direction: "north",
    }

    const [address] = parseV40Addresses(adrLine(components))

    expect(address.value).toEqual(components)
  })

  it("parses the example from RFC 9554 section 2.1", () => {
    // Quoted verbatim from RFC 9554, so it keeps the specification's own
    // sample data instead of the synthetic values used everywhere else.
    // The line fold is already applied.
    const [address] = parseV40Addresses(
      'ADR;GEO="geo:12.3457,78.910":' +
        ";;123 Main Street;Any Town;CA;91921-1234;U.S.A" +
        ";;;;123;Main Street;;;;;;"
    )

    expect(address.value).toEqual({
      poBox: "",
      secondStreetAddress: "",
      streetAddress: "123 Main Street",
      city: "Any Town",
      state: "CA",
      zipCode: "91921-1234",
      country: "U.S.A",
      room: "",
      apartment: "",
      floor: "",
      streetNumber: "123",
      streetName: "Main Street",
      building: "",
      block: "",
      subdistrict: "",
      district: "",
      landmark: "",
      direction: "",
    })
  })

  it("leaves the new components undefined for a seven component address", () => {
    const [address] = parseV40Addresses(
      "ADR;TYPE=home:;;123 Main Street;Any Town;CA;91921-1234;U.S.A"
    )

    expect(address.value.streetNumber).toBeUndefined()
    expect(address.value.direction).toBeUndefined()
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const ALL_VERSIONS = [VCardVersion.v21, VCardVersion.v30, VCardVersion.v40]

const parseCard = (version: VCardVersion, ...lines: string[]) =>
  new VCardParser(version).parse(
    ["BEGIN:VCARD", `VERSION:${version}`, ...lines, "END:VCARD", ""].join(
      "\r\n"
    )
  )[0]

describe.each(ALL_VERSIONS)("properties (vCard %s)", (version) => {
  const parse = (...lines: string[]) => parseCard(version, ...lines)

  describe("FN", () => {
    it("reads the formatted name", () => {
      expect(parse("FN:John Doe").FN?.[0].value).toBe("John Doe")
    })

    it("reads an empty formatted name", () => {
      expect(parse("FN:").FN?.[0].value).toBe("")
    })
  })

  describe("N", () => {
    it("reads every component in its position", () => {
      expect(parse("N:Doe;John;Quinlan;Dr.;Jr.").N?.[0].value).toMatchObject({
        lastName: "Doe",
        firstName: "John",
        middleName: "Quinlan",
        namePrefix: "Dr.",
        nameSuffix: "Jr.",
      })
    })

    it("leaves an omitted component empty", () => {
      expect(parse("N:Doe;John;;;").N?.[0].value).toMatchObject({
        middleName: "",
        namePrefix: "",
        nameSuffix: "",
      })
    })

    it("keeps a comma separated list of additional names as written", () => {
      expect(parse("N:Doe;John;Quinlan,Test;;").N?.[0].value.middleName).toBe(
        "Quinlan,Test"
      )
    })
  })

  describe("NICKNAME", () => {
    it("reads a single nickname", () => {
      expect(parse("NICKNAME:Johnny").NICKNAME?.[0].value).toEqual(["Johnny"])
    })

    it("reads a comma separated list of nicknames", () => {
      expect(parse("NICKNAME:Johnny,JD").NICKNAME?.[0].value).toEqual([
        "Johnny",
        "JD",
      ])
    })
  })

  describe("TEL", () => {
    it("reads a phone number", () => {
      expect(parse("TEL:123456789").TEL?.[0].value.phoneNumber).toBe(
        "123456789"
      )
    })

    it("keeps the formatting of a phone number", () => {
      expect(parse("TEL:+48 12 345 67 89").TEL?.[0].value.phoneNumber).toBe(
        "+48 12 345 67 89"
      )
    })
  })

  describe("EMAIL", () => {
    it("reads an email address", () => {
      expect(parse("EMAIL:test@example.com").EMAIL?.[0].value).toBe(
        "test@example.com"
      )
    })
  })

  describe("ADR", () => {
    it("reads every component in its position", () => {
      const address = parse(
        "ADR:PO Box 1;Apt 1;1 Example St.;Example City;EX;12345;Example Country"
      ).ADR?.[0].value

      expect(address).toMatchObject({
        poBox: "PO Box 1",
        secondStreetAddress: "Apt 1",
        streetAddress: "1 Example St.",
        city: "Example City",
        state: "EX",
        zipCode: "12345",
        country: "Example Country",
      })
    })
  })

  describe("ORG", () => {
    it("reads an organization without a unit", () => {
      expect(parse("ORG:Example Org").ORG?.[0].value).toEqual({
        name: "Example Org",
        unit: "",
      })
    })

    it("reads an organization with one unit", () => {
      expect(parse("ORG:Example Org;Unit A").ORG?.[0].value).toEqual({
        name: "Example Org",
        unit: "Unit A",
      })
    })
  })

  describe("TITLE", () => {
    it("reads a job title", () => {
      expect(parse("TITLE:Example Title").TITLE?.[0].value).toBe(
        "Example Title"
      )
    })
  })

  describe("ROLE", () => {
    it("reads a role", () => {
      expect(parse("ROLE:Example Role").ROLE?.[0].value).toBe("Example Role")
    })
  })

  describe("NOTE", () => {
    it("reads a note", () => {
      expect(parse("NOTE:Example note").NOTE?.[0].value).toBe("Example note")
    })

    it("keeps every note of a contact", () => {
      expect(
        parse("NOTE:First note", "NOTE:Second note").NOTE?.map((n) => n.value)
      ).toEqual(["First note", "Second note"])
    })
  })

  describe("URL", () => {
    it("reads a url", () => {
      expect(parse("URL:http://example.com").URL?.[0].value).toBe(
        "http://example.com"
      )
    })

    it("keeps the scheme and the path of a url", () => {
      expect(parse("URL:https://example.com/a/b?c=d").URL?.[0].value).toBe(
        "https://example.com/a/b?c=d"
      )
    })
  })

  describe("extension properties", () => {
    it("reads a property whose name starts with X-", () => {
      const contact = parse("X-EXAMPLE:example value")

      expect(contact["X-EXAMPLE"]?.[0].value).toBe("example value")
    })

    it("reads an extension property written in mixed case", () => {
      const contact = parse("X-Example:example value")

      expect(Object.keys(contact)).toContain("X-Example")
    })
  })

  describe("grouped properties", () => {
    it("exposes the group name as a parameter", () => {
      const contact = parse("item1.NOTE:Example note")

      expect(contact.NOTE?.[0].value).toBe("Example note")
      expect(contact.NOTE?.[0].parameters.CUSTOM_GROUP_NAME).toEqual(["item1"])
    })

    it("keeps properties of different groups apart", () => {
      const contact = parse("item1.NOTE:First note", "item2.NOTE:Second note")

      expect(
        contact.NOTE?.map((n) => n.parameters.CUSTOM_GROUP_NAME?.[0])
      ).toEqual(["item1", "item2"])
    })

    it("reads a grouped extension property", () => {
      const contact = parse("item1.X-EXAMPLE:example value")

      expect(contact["X-EXAMPLE"]?.[0].parameters.CUSTOM_GROUP_NAME).toEqual([
        "item1",
      ])
    })

    it("reads a group name that is not numbered", () => {
      // RFC 6350 sec. 3.3: group = 1*(ALPHA / DIGIT / "-").
      const contact = parse("itemA.NOTE:Example note")

      expect(contact.NOTE?.[0].value).toBe("Example note")
      expect(contact.NOTE?.[0].parameters.CUSTOM_GROUP_NAME).toEqual(["itemA"])
    })

    it("reads the grouping example of the vCard 2.1 specification", () => {
      // vCard 2.1 "Grouping": a conforming reader must parse this.
      const contact = parse("A.TEL;HOME:123456789", "A.NOTE:Example note")

      expect(contact.TEL?.[0].value.phoneNumber).toBe("123456789")
      expect(contact.NOTE?.[0].parameters.CUSTOM_GROUP_NAME).toEqual(["A"])
    })
  })
})

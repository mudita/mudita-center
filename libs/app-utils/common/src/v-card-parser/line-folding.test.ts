/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const parseSingleContact = (version: VCardVersion, body: string) =>
  new VCardParser(version).parse(
    `BEGIN:VCARD\r\nVERSION:${version}\r\nFN:John Doe\r\n${body}END:VCARD\r\n`
  )[0]

describe.each([VCardVersion.v21, VCardVersion.v30, VCardVersion.v40])(
  "line folding (vCard %s)",
  (version) => {
    it("unfolds a value continued with a leading space", () => {
      const contact = parseSingleContact(
        version,
        "NOTE:This is a long descrip\r\n tion that exists on a long line.\r\n"
      )

      expect(contact.NOTE?.[0].value).toBe(
        "This is a long description that exists on a long line."
      )
    })

    it("unfolds a value continued with a leading tab", () => {
      const contact = parseSingleContact(
        version,
        "NOTE:This is a long descrip\r\n\ttion that exists on a long line.\r\n"
      )

      expect(contact.NOTE?.[0].value).toBe(
        "This is a long description that exists on a long line."
      )
    })

    it("unfolds a value split across several continuation lines", () => {
      // Example folding taken from RFC 6350 sec. 3.2.
      const contact = parseSingleContact(
        version,
        "NOTE:This is a long descrip\r\n tion that exists o\r\n n a long line.\r\n"
      )

      expect(contact.NOTE?.[0].value).toBe(
        "This is a long description that exists on a long line."
      )
    })

    it("removes only the single white space character that folds the line", () => {
      const contact = parseSingleContact(
        version,
        "NOTE:indented\r\n  two spaces\r\n"
      )

      expect(contact.NOTE?.[0].value).toBe("indented two spaces")
    })

    it("keeps separate properties apart", () => {
      const contact = parseSingleContact(
        version,
        "NOTE:first note\r\nNOTE:second note\r\n"
      )

      expect(contact.NOTE?.map((n) => n.value)).toEqual([
        "first note",
        "second note",
      ])
    })
  }
)

describe("line folding of an ADR value", () => {
  it("keeps the RFC 9554 components of a folded address", () => {
    // A full 18 component ADR exceeds the 75 octet limit of RFC 6350 sec. 3.2,
    // so producers fold it - the components must survive unfolding.
    const contact = parseSingleContact(
      VCardVersion.v40,
      "ADR;TYPE=home:;;1 Example St.;Example City;CA;12345;Example Country;;;;12\r\n" +
        " 3;Example St.;;;;;;\r\n"
    )

    expect(contact.ADR?.[0].value).toMatchObject({
      streetAddress: "1 Example St.",
      streetNumber: "123",
      streetName: "Example St.",
      country: "Example Country",
    })
  })
})

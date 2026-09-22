/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const card = (version: VCardVersion, ...lines: string[]) =>
  ["BEGIN:VCARD", `VERSION:${version}`, ...lines, "END:VCARD", ""].join("\r\n")

const parse30 = (vcf: string) => new VCardParser(VCardVersion.v30).parse(vcf)

describe("VCardParser.determineVersion", () => {
  it.each([VCardVersion.v21, VCardVersion.v30, VCardVersion.v40])(
    "reads version %s",
    (version) => {
      expect(VCardParser.determineVersion(card(version))).toBe(version)
    }
  )

  it("reads a version line written in lower case", () => {
    expect(VCardParser.determineVersion("version:3.0")).toBe(VCardVersion.v30)
  })

  it("does not take an indented line for a version line", () => {
    // A line that starts with white space continues the previous one
    // (RFC 6350 sec. 3.2), so it is never a property of its own.
    expect(
      VCardParser.determineVersion("BEGIN:VCARD\r\n\tVERSION:3.0\r\n")
    ).toBeNull()
  })

  it("does not take a folded continuation for the version", () => {
    expect(
      VCardParser.determineVersion(
        "BEGIN:VCARD\r\nNOTE:see\r\n VERSION:4.0\r\nVERSION:3.0\r\n"
      )
    ).toBe(VCardVersion.v30)
  })

  it("returns null when there is no version line", () => {
    expect(
      VCardParser.determineVersion("BEGIN:VCARD\r\nFN:John\r\n")
    ).toBeNull()
  })

  it("returns null for a version the parser does not support", () => {
    expect(VCardParser.determineVersion("VERSION:9.9")).toBeNull()
  })

  it("returns null for empty data", () => {
    expect(VCardParser.determineVersion("")).toBeNull()
  })

  it("does not take a version mentioned inside a value", () => {
    expect(
      VCardParser.determineVersion("NOTE:see VERSION:9.9 below\r\nVERSION:4.0")
    ).toBe(VCardVersion.v40)
  })
})

describe("VCardParser.splitCards", () => {
  it("returns one entry per card", () => {
    const file =
      card(VCardVersion.v30, "FN:John") + card(VCardVersion.v21, "FN:Jane")

    expect(VCardParser.splitCards(file)).toHaveLength(2)
  })

  it("returns a single entry for a single card", () => {
    expect(
      VCardParser.splitCards(card(VCardVersion.v30, "FN:John"))
    ).toHaveLength(1)
  })

  it("splits on a lower case end marker", () => {
    const file =
      "begin:vcard\r\nversion:3.0\r\nfn:John\r\nend:vcard\r\n" +
      "begin:vcard\r\nversion:3.0\r\nfn:Jane\r\nend:vcard\r\n"

    expect(VCardParser.splitCards(file)).toHaveLength(2)
  })

  it("keeps a card that has no end marker", () => {
    expect(
      VCardParser.splitCards("BEGIN:VCARD\r\nVERSION:3.0\r\nFN:John\r\n")
    ).toHaveLength(1)
  })

  it("drops whitespace only leftovers", () => {
    expect(
      VCardParser.splitCards(card(VCardVersion.v30, "FN:John") + "\r\n \r\n")
    ).toHaveLength(1)
  })

  it("returns nothing for empty data", () => {
    expect(VCardParser.splitCards("")).toEqual([])
  })
})

describe("VCardParser.parse", () => {
  it("returns one contact per card", () => {
    const contacts = parse30(
      card(VCardVersion.v30, "FN:John") + card(VCardVersion.v30, "FN:Jane")
    )

    expect(contacts.map((c) => c.FN?.[0].value)).toEqual(["John", "Jane"])
  })

  it("returns nothing for empty data", () => {
    expect(parse30("")).toEqual([])
  })

  it("returns an empty contact when no line can be parsed", () => {
    expect(parse30(card(VCardVersion.v30, "BDAY:1990-01-01"))).toEqual([{}])
  })

  it("collects repeated properties under one key, in document order", () => {
    const [contact] = parse30(card(VCardVersion.v30, "TEL:1", "TEL:2", "TEL:3"))

    expect(contact.TEL?.map((t) => t.value.phoneNumber)).toEqual([
      "1",
      "2",
      "3",
    ])
  })

  it("exposes every parameter value as a list", () => {
    const [contact] = parse30(card(VCardVersion.v30, "TEL;TYPE=home,voice:1"))

    expect(contact.TEL?.[0].parameters.TYPE).toEqual(["home", "voice"])
  })

  it("merges parameters repeated on one line", () => {
    const [contact] = parse30(
      card(VCardVersion.v30, "TEL;TYPE=home;TYPE=pref:1")
    )

    expect(contact.TEL?.[0].parameters.TYPE).toEqual(["home", "pref"])
  })

  it("leaves out a parameter that carries no value", () => {
    const [contact] = parse30(card(VCardVersion.v30, "NOTE;LANGUAGE=:hello"))

    expect(contact.NOTE?.[0].parameters).toEqual({})
    expect(contact.NOTE?.[0].value).toBe("hello")
  })

  it("skips a property it does not support and keeps the rest", () => {
    const [contact] = parse30(
      card(VCardVersion.v30, "FN:John", "BDAY:1990-01-01", "NOTE:kept")
    )

    expect(contact.FN?.[0].value).toBe("John")
    expect(contact.NOTE?.[0].value).toBe("kept")
    expect(contact).not.toHaveProperty("BDAY")
  })

  it("keeps the colon inside a value", () => {
    const [contact] = parse30(card(VCardVersion.v30, "NOTE:see http://a.b/c"))

    expect(contact.NOTE?.[0].value).toBe("see http://a.b/c")
  })

  it.each([
    ["CRLF", "\r\n"],
    ["LF", "\n"],
    ["CR", "\r"],
  ])("reads a file with %s line endings", (_, lineEnding) => {
    const vcf = ["BEGIN:VCARD", "VERSION:3.0", "FN:John", "END:VCARD", ""].join(
      lineEnding
    )

    expect(parse30(vcf)[0].FN?.[0].value).toBe("John")
  })

  it("ignores blank lines", () => {
    const [contact] = parse30(
      "BEGIN:VCARD\r\n\r\nVERSION:3.0\r\n\r\nFN:John\r\n\r\nEND:VCARD\r\n"
    )

    expect(contact.FN?.[0].value).toBe("John")
  })

  it("parses a card whose entries the parser was not built for", () => {
    // The version the parser is built with decides how a card is read, so a
    // 2.1 card read with the 3.0 parser still yields what 3.0 understands.
    const [contact] = parse30(card(VCardVersion.v21, "FN:John", "TEL;HOME:1"))

    expect(contact.FN?.[0].value).toBe("John")
    expect(contact.TEL?.[0].value.phoneNumber).toBe("1")
    expect(contact.TEL?.[0].parameters.TYPE).toBeUndefined()
  })
})

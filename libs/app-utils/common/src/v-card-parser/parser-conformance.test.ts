/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const ALL_VERSIONS = [VCardVersion.v21, VCardVersion.v30, VCardVersion.v40]

const card = (version: VCardVersion, ...lines: string[]) =>
  ["BEGIN:VCARD", `VERSION:${version}`, ...lines, "END:VCARD", ""].join("\r\n")

const parseCard = (version: VCardVersion, ...lines: string[]) =>
  new VCardParser(version).parse(card(version, ...lines))[0]

// Narrowed to 4.0, so that the components and parameters only that version
// knows about are typed.
const parseV40Card = (...lines: string[]) =>
  new VCardParser(VCardVersion.v40).parse(card(VCardVersion.v40, ...lines))[0]

describe.each(ALL_VERSIONS)("property names (vCard %s)", (version) => {
  // RFC 6350 sec. 3.3: "Property names and parameter names are
  // case-insensitive (e.g., the property name "fn" is the same as "FN")".
  it("reads a file written with lower case property names", () => {
    const contact = new VCardParser(version).parse(
      `begin:vcard\r\nversion:${version}\r\nn:Doe;John;;;\r\nnote:hello\r\nend:vcard\r\n`
    )[0]

    expect(contact.N?.[0].value.lastName).toBe("Doe")
    expect(contact.NOTE?.[0].value).toBe("hello")
  })

  it("determines the version regardless of case", () => {
    expect(
      VCardParser.determineVersion(`begin:vcard\r\nversion:${version}\r\n`)
    ).toBe(version)
  })

  it("matches the whole name, so a longer property is not taken for N", () => {
    const contact = parseCard(
      version,
      "N:Doe;John;;;",
      "NOTE:a note",
      "NICKNAME:Johnny",
      "NAME:Card name"
    )

    expect(contact.N).toHaveLength(1)
    expect(contact.N?.[0].value.lastName).toBe("Doe")
    expect(contact.NOTE?.[0].value).toBe("a note")
    expect(contact.NICKNAME?.[0].value).toEqual(["Johnny"])
  })

  it("keeps a nickname out of the name property", () => {
    const contact = parseCard(version, "NICKNAME:Johnny", "N:Doe;John;;;")

    expect(contact.N).toHaveLength(1)
    expect(contact.N?.[0].value.lastName).toBe("Doe")
    expect(contact.NICKNAME?.[0].value).toEqual(["Johnny"])
  })

  it("ignores a property it does not support instead of guessing", () => {
    const contact = parseCard(version, "N:Doe;John;;;", "NAME:Card name")

    expect(contact.N).toHaveLength(1)
    expect(contact.N?.[0].value.lastName).toBe("Doe")
  })
})

describe.each(ALL_VERSIONS)("escaping (vCard %s)", (version) => {
  // Every version escapes a semicolon inside a compound value
  // (vCard 2.1 "Delimiters", RFC 2426 sec. 2.5, RFC 6350 sec. 3.4).
  it("does not split a structured name on an escaped semicolon", () => {
    const contact = parseCard(version, "N:Doe\\;Smith;John;;;")

    expect(contact.N?.[0].value).toMatchObject({
      lastName: "Doe;Smith",
      firstName: "John",
    })
  })

  it("unescapes an organization name", () => {
    const contact = parseCard(version, "ORG:Example Org\\; Inc.;RnD")

    expect(contact.ORG?.[0].value.name).toBe("Example Org; Inc.")
  })

  it("keeps quotation marks that are part of a value", () => {
    const contact = parseCard(version, 'NOTE:"quoted note"')

    expect(contact.NOTE?.[0].value).toBe('"quoted note"')
  })

  it("keeps quotation marks inside a structured component", () => {
    // Quotation marks only delimit a parameter value (RFC 6350 sec. 3.3); in a
    // property value they are content.
    const contact = parseCard(version, 'ADR:;;"1 Example St.";Example City;;;')

    expect(contact.ADR?.[0].value.streetAddress).toBe('"1 Example St."')
  })
})

describe.each([VCardVersion.v30, VCardVersion.v40])(
  "escaping beyond the semicolon (vCard %s)",
  (version) => {
    // RFC 2425 sec. 5.8.4, RFC 2426 sec. 2.5 and RFC 6350 sec. 3.4 add the
    // comma, the backslash and "\n" on top of the semicolon.
    it("unescapes a comma in an address component", () => {
      const contact = parseCard(
        version,
        "ADR;TYPE=home:;;1 Example St.\\, Apt 1;Example City;EX;12345;Example Country"
      )

      expect(contact.ADR?.[0].value.streetAddress).toBe("1 Example St., Apt 1")
    })

    it("turns an escaped n in a note into a new line", () => {
      const contact = parseCard(version, "NOTE:line one\\nline two")

      expect(contact.NOTE?.[0].value).toBe("line one\nline two")
    })

    it("unescapes a backslash", () => {
      const contact = parseCard(version, "NOTE:back\\\\slash")

      expect(contact.NOTE?.[0].value).toBe("back\\slash")
    })
  }
)

describe("escaping (vCard 2.1)", () => {
  // vCard 2.1 escapes the semicolon and nothing else, so a backslash in front
  // of any other character is literal content that has to survive.
  it("keeps a backslash that does not escape a semicolon", () => {
    const contact = parseCard(VCardVersion.v21, "NOTE:see C:\\notes\\new.txt")

    expect(contact.NOTE?.[0].value).toBe("see C:\\notes\\new.txt")
  })

  it("keeps an escaped comma as written", () => {
    const contact = parseCard(VCardVersion.v21, "NOTE:one\\, two")

    expect(contact.NOTE?.[0].value).toBe("one\\, two")
  })

  it("still unescapes a semicolon", () => {
    const contact = parseCard(VCardVersion.v21, "ORG:Example Org\\; Inc.")

    expect(contact.ORG?.[0].value.name).toBe("Example Org; Inc.")
  })
})

describe.each(ALL_VERSIONS)("ORG (vCard %s)", (version) => {
  // RFC 6350 sec. 6.6.4: an organization name may be followed by any number of
  // organizational units.
  it("keeps every organizational unit", () => {
    const contact = parseCard(version, "ORG:Example Org;RnD;Team A")

    expect(contact.ORG?.[0].value).toEqual({
      name: "Example Org",
      unit: "RnD, Team A",
    })
  })
})

describe.each(ALL_VERSIONS)("TEL (vCard %s)", (version) => {
  // RFC 6350 sec. 6.4.1 recommends the URI form, and producers write it with
  // and without the VALUE parameter.
  it("strips the scheme of a tel URI written without VALUE=uri", () => {
    const contact = parseCard(version, "TEL;TYPE=home:tel:123456789")

    expect(contact.TEL?.[0].value.phoneNumber).toBe("123456789")
  })

  it("keeps a plain phone number untouched", () => {
    const contact = parseCard(version, "TEL;TYPE=home:+48 12 345 67 89")

    expect(contact.TEL?.[0].value.phoneNumber).toBe("+48 12 345 67 89")
  })

  it("reads the extension of a tel URI", () => {
    const contact = parseCard(version, "TEL;TYPE=work:tel:123456789;ext=123")

    expect(contact.TEL?.[0].value).toMatchObject({
      phoneNumber: "123456789",
      extension: "123",
    })
  })
})

describe("grouped properties", () => {
  it("reads a property that carries a group name", () => {
    const contact = parseCard(
      VCardVersion.v30,
      "item1.EMAIL;type=INTERNET:test@example.com"
    )

    expect(contact.EMAIL?.[0].value).toBe("test@example.com")
    expect(contact.EMAIL?.[0].parameters.CUSTOM_GROUP_NAME).toEqual(["item1"])
  })

  it("skips a grouped property it does not support without failing the card", () => {
    const contact = parseCard(
      VCardVersion.v30,
      "N:Doe;John;;;",
      "item1.BDAY:1990-01-01",
      "NOTE:still here"
    )

    expect(contact.N?.[0].value.lastName).toBe("Doe")
    expect(contact.NOTE?.[0].value).toBe("still here")
  })

  it("accepts a group name written in upper case", () => {
    const contact = parseCard(VCardVersion.v30, "ITEM1.NOTE:grouped note")

    expect(contact.NOTE?.[0].value).toBe("grouped note")
  })
})

describe("quoted-printable soft line breaks (vCard 2.1)", () => {
  it("joins a value broken up with a soft line break", () => {
    const contact = new VCardParser(VCardVersion.v21).parse(
      "BEGIN:VCARD\r\nVERSION:2.1\r\n" +
        "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:pierwsza linia=\r\n" +
        "druga linia\r\n" +
        "END:VCARD\r\n"
    )[0]

    expect(contact.NOTE?.[0].value).toBe("pierwsza liniadruga linia")
  })

  it("decodes a value broken up over several lines", () => {
    const contact = new VCardParser(VCardVersion.v21).parse(
      "BEGIN:VCARD\r\nVERSION:2.1\r\n" +
        "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:za=C5=BC=C3=B3=\r\n" +
        "=C5=82=\r\n" +
        "=C4=87\r\n" +
        "END:VCARD\r\n"
    )[0]

    expect(contact.NOTE?.[0].value).toBe("zażółć")
  })

  it("joins a continuation that is indented, keeping its leading space", () => {
    // Shaped after the NOTE example of the vCard 2.1 specification: the soft
    // break removes the "=" and the line break, and the space that opens the
    // continuation is part of the value.
    const contact = new VCardParser(VCardVersion.v21).parse(
      "BEGIN:VCARD\r\nVERSION:2.1\r\n" +
        "NOTE;ENCODING=QUOTED-PRINTABLE:Example machine is operational=\r\n" +
        " 0830 to 1715 hours=0D=0A=\r\n" +
        "Monday through Friday.\r\n" +
        "END:VCARD\r\n"
    )[0]

    expect(contact.NOTE?.[0].value).toBe(
      "Example machine is operational 0830 to 1715 hours\r\nMonday through Friday."
    )
  })

  it("does not swallow the next property of a plain value", () => {
    const contact = new VCardParser(VCardVersion.v21).parse(
      "BEGIN:VCARD\r\nVERSION:2.1\r\nNOTE:ends with=\r\nTEL;HOME:123\r\nEND:VCARD\r\n"
    )[0]

    expect(contact.NOTE?.[0].value).toBe("ends with=")
    expect(contact.TEL?.[0].value.phoneNumber).toBe("123")
  })
})

describe("parameters", () => {
  it("reads a vCard 2.1 sub-type written in the TYPE= form", () => {
    const contact = parseCard(VCardVersion.v21, "TEL;TYPE=HOME:123")

    expect(contact.TEL?.[0].parameters.TYPE).toEqual(["home"])
  })

  it("reads a bare vCard 2.1 sub-type", () => {
    const contact = parseCard(VCardVersion.v21, "TEL;HOME;PREF:123")

    expect(contact.TEL?.[0].parameters.TYPE).toEqual(["home", "pref"])
  })

  it("does not split a parameter on a semicolon inside quotes", () => {
    const contact = parseV40Card(
      'ORG;SORT-AS="Example Org;Inc":Example Org;RnD'
    )

    expect(contact.ORG?.[0].parameters["SORT-AS"]).toEqual(["Example Org;Inc"])
    expect(contact.ORG?.[0].value.name).toBe("Example Org")
  })
})

describe("splitting a file into cards", () => {
  it("returns one entry per vCard", () => {
    const file =
      card(VCardVersion.v30, "N:Doe;John;;;") +
      card(VCardVersion.v21, "N:Roe;Jane;;;")

    expect(VCardParser.splitCards(file)).toHaveLength(2)
  })

  it("ignores trailing whitespace after the last card", () => {
    expect(
      VCardParser.splitCards(
        card(VCardVersion.v30, "N:Doe;John;;;") + "\r\n\r\n"
      )
    ).toHaveLength(1)
  })
})

describe("N components added by RFC 9554 (vCard 4.0)", () => {
  it("reads the secondary surname and the generation", () => {
    // Quoted verbatim from RFC 9554, so it keeps the specification's own
    // sample data instead of the synthetic values used everywhere else.
    const contact = parseV40Card(
      "N:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.;;Jr."
    )

    expect(contact.N?.[0].value).toEqual({
      lastName: "Stevenson",
      firstName: "John",
      middleName: "Philip,Paul",
      namePrefix: "Dr.",
      nameSuffix: "Jr.,M.D.,A.C.P.",
      secondarySurname: "",
      generation: "Jr.",
    })
  })

  it("leaves the new components undefined for a five component name", () => {
    const contact = parseV40Card("N:Public;John;Quinlan;Mr.;Esq.")

    expect(contact.N?.[0].value.secondarySurname).toBeUndefined()
    expect(contact.N?.[0].value.generation).toBeUndefined()
  })
})

describe("malformed input", () => {
  it("keeps reading a card after a value with an unbalanced quotation mark", () => {
    const contact = parseCard(
      VCardVersion.v30,
      'NOTE:he said "hi',
      "N:Doe;John;;;",
      "TEL;TYPE=home:123456789"
    )

    expect(contact.NOTE?.[0].value).toBe('he said "hi')
    expect(contact.N?.[0].value.lastName).toBe("Doe")
    expect(contact.TEL?.[0].value.phoneNumber).toBe("123456789")
  })
})

describe.each(ALL_VERSIONS)("apostrophes (vCard %s)", (version) => {
  // An apostrophe is ordinary content, not a quotation mark, so it must not
  // suppress the separator that follows it.
  it("keeps the components of a name holding an apostrophe apart", () => {
    const contact = parseCard(version, "N:O'Connor;John;;;")

    expect(contact.N?.[0].value).toMatchObject({
      lastName: "O'Connor",
      firstName: "John",
    })
  })

  it("keeps the components of an address holding an apostrophe apart", () => {
    const contact = parseCard(
      version,
      "ADR:;;1 O'Connor St.;Example City;EX;12345;Example Country"
    )

    expect(contact.ADR?.[0].value).toMatchObject({
      streetAddress: "1 O'Connor St.",
      city: "Example City",
      zipCode: "12345",
    })
  })

  it("keeps an organization holding an apostrophe apart from its unit", () => {
    const contact = parseCard(version, "ORG:O'Connor's Org;Unit A")

    expect(contact.ORG?.[0].value).toEqual({
      name: "O'Connor's Org",
      unit: "Unit A",
    })
  })
})

describe("card boundaries", () => {
  it("does not end a card on the words END:VCARD inside a value", () => {
    const file = card(
      VCardVersion.v30,
      "N:Doe;John;;;",
      "NOTE:please write END:VCARD here"
    )

    expect(VCardParser.splitCards(file)).toHaveLength(1)

    const [contact, ...rest] = new VCardParser(VCardVersion.v30).parse(file)

    expect(contact.NOTE?.[0].value).toBe("please write END:VCARD here")
    expect(rest).toEqual([])
  })

  it("ends a card on an END:VCARD line of its own", () => {
    const file =
      card(VCardVersion.v30, "N:Doe;John;;;") +
      card(VCardVersion.v30, "N:Roe;Jane;;;")

    expect(VCardParser.splitCards(file)).toHaveLength(2)
  })
})

describe("VCardParser.declaresVersion", () => {
  it("is true for a version the parser does not support", () => {
    const file = card(VCardVersion.v30, "N:Doe;John;;;").replace("3.0", "9.9")

    expect(VCardParser.declaresVersion(file)).toBe(true)
    expect(VCardParser.determineVersion(file)).toBeNull()
  })

  it("is false when no version is declared", () => {
    expect(
      VCardParser.declaresVersion("BEGIN:VCARD\r\nFN:John Doe\r\nEND:VCARD\r\n")
    ).toBe(false)
  })
})

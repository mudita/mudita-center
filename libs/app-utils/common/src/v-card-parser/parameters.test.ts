/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCardParser } from "./v-card-parser"
import { VCardVersion } from "./v-card-parser.types"

const card = (version: VCardVersion, ...lines: string[]) =>
  ["BEGIN:VCARD", `VERSION:${version}`, ...lines, "END:VCARD", ""].join("\r\n")

// One builder per version, so that the parameters only a given version knows
// about are typed rather than collapsing into a union of all three.
const parse21 = (...lines: string[]) =>
  new VCardParser(VCardVersion.v21).parse(card(VCardVersion.v21, ...lines))[0]

const parse30 = (...lines: string[]) =>
  new VCardParser(VCardVersion.v30).parse(card(VCardVersion.v30, ...lines))[0]

const parse40 = (...lines: string[]) =>
  new VCardParser(VCardVersion.v40).parse(card(VCardVersion.v40, ...lines))[0]

describe("parameters (vCard 2.1)", () => {
  const parse = parse21

  it("reads a bare sub-type", () => {
    expect(parse("TEL;HOME:123456789").TEL?.[0].parameters.TYPE).toEqual([
      "home",
    ])
  })

  it("reads several bare sub-types", () => {
    expect(
      parse("TEL;HOME;VOICE;PREF:123456789").TEL?.[0].parameters.TYPE
    ).toEqual(["home", "voice", "pref"])
  })

  it("reads a sub-type written in the TYPE= form", () => {
    expect(parse("TEL;TYPE=WORK:123456789").TEL?.[0].parameters.TYPE).toEqual([
      "work",
    ])
  })

  it("reads a comma separated list in the TYPE= form", () => {
    expect(
      parse("TEL;TYPE=WORK,VOICE:123456789").TEL?.[0].parameters.TYPE
    ).toEqual(["work", "voice"])
  })

  it("decodes a quoted-printable value", () => {
    const contact = parse(
      "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:za=C5=BC=C3=B3=C5=82=C4=87"
    )

    expect(contact.NOTE?.[0].value).toBe("zażółć")
  })

  it("decodes a base64 value", () => {
    const contact = parse(
      `NOTE;ENCODING=BASE64;CHARSET=UTF-8:${Buffer.from(
        "Example note"
      ).toString("base64")}`
    )

    expect(contact.NOTE?.[0].value).toBe("Example note")
  })

  it("decodes an iso-8859-2 value", () => {
    const contact = parse(
      "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=ISO-8859-2:za=BF=F3=B3=E6"
    )

    expect(contact.NOTE?.[0].value).toBe("zażółć")
  })

  it("does not expose the encoding parameters as a type", () => {
    const contact = parse("NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:plain")

    expect(contact.NOTE?.[0].parameters).toEqual({})
  })
})

describe("parameters (vCard 3.0)", () => {
  const parse = parse30

  it("reads the LANGUAGE parameter", () => {
    expect(
      parse("NOTE;LANGUAGE=pl:Notatka").NOTE?.[0].parameters.LANGUAGE
    ).toEqual(["pl"])
  })

  it("reads a quoted LANGUAGE parameter", () => {
    expect(
      parse('NOTE;LANGUAGE="en-GB":Example note').NOTE?.[0].parameters.LANGUAGE
    ).toEqual(["en-GB"])
  })

  it("reads the VALUE parameter", () => {
    expect(
      parse("TEL;VALUE=uri:tel:123456789").TEL?.[0].parameters.VALUE
    ).toEqual(["uri"])
  })

  it("drops a VALUE parameter the specification does not define", () => {
    expect(parse("TEL;VALUE=bogus:123456789").TEL?.[0].parameters).toEqual({})
  })

  it("reads the TYPE parameter", () => {
    expect(parse("TEL;TYPE=home:123456789").TEL?.[0].parameters.TYPE).toEqual([
      "home",
    ])
  })

  it("reads the CONTEXT parameter", () => {
    expect(
      parse("NOTE;CONTEXT=word:Example note").NOTE?.[0].parameters.CONTEXT
    ).toEqual(["word"])
  })

  it("drops a parameter it does not know", () => {
    expect(parse("NOTE;X-EXAMPLE=1:Example note").NOTE?.[0].parameters).toEqual(
      {}
    )
  })
})

describe("parameters (vCard 4.0)", () => {
  const parse = parse40

  it("reads the LANGUAGE parameter", () => {
    expect(
      parse("NOTE;LANGUAGE=pl:Notatka").NOTE?.[0].parameters.LANGUAGE
    ).toEqual(["pl"])
  })

  it.each([
    "text",
    "uri",
    "date",
    "date-and-or-time",
    "timestamp",
    "utc-offset",
  ])("reads the VALUE parameter set to %s", (dataType) => {
    expect(
      parse(`NOTE;VALUE=${dataType}:Example note`).NOTE?.[0].parameters.VALUE
    ).toEqual([dataType])
  })

  it("drops a VALUE parameter the specification does not define", () => {
    expect(parse("NOTE;VALUE=bogus:Example note").NOTE?.[0].parameters).toEqual(
      {}
    )
  })

  it("reads the PREF parameter as a number", () => {
    expect(parse("TEL;PREF=1:123456789").TEL?.[0].parameters.PREF).toEqual([1])
  })

  it("reads the highest allowed PREF value", () => {
    expect(parse("TEL;PREF=100:123456789").TEL?.[0].parameters.PREF).toEqual([
      100,
    ])
  })

  it.each(["0", "101", "abc"])(
    "drops PREF set to %s, which is out of range",
    (pref) => {
      expect(parse(`TEL;PREF=${pref}:123456789`).TEL?.[0].parameters).toEqual(
        {}
      )
    }
  )

  it("reads the ALTID parameter", () => {
    expect(
      parse("NOTE;ALTID=1:Example note").NOTE?.[0].parameters.ALTID
    ).toEqual(["1"])
  })

  it("reads the PID parameter", () => {
    expect(parse("TEL;PID=1.1:123456789").TEL?.[0].parameters.PID).toEqual([
      "1.1",
    ])
  })

  it("reads several PID values", () => {
    expect(parse("TEL;PID=1,2:123456789").TEL?.[0].parameters.PID).toEqual([
      "1",
      "2",
    ])
  })

  it("drops a PID parameter that is not numbered", () => {
    expect(parse("TEL;PID=abc:123456789").TEL?.[0].parameters).toEqual({})
  })

  it("reads the TYPE parameter", () => {
    expect(parse("TEL;TYPE=home:123456789").TEL?.[0].parameters.TYPE).toEqual([
      "home",
    ])
  })

  it("reads a quoted list of TYPE values", () => {
    expect(
      parse('TEL;TYPE="home,voice":123456789').TEL?.[0].parameters.TYPE
    ).toEqual(["home", "voice"])
  })

  it("reads the MEDIATYPE parameter", () => {
    expect(
      parse("URL;MEDIATYPE=text/html:http://example.com").URL?.[0].parameters
        .MEDIATYPE
    ).toEqual(["text/html"])
  })

  it("reads the CALSCALE parameter", () => {
    expect(
      parse("NOTE;CALSCALE=gregorian:Example note").NOTE?.[0].parameters
        .CALSCALE
    ).toEqual(["gregorian"])
  })

  it("reads the SORT-AS parameter", () => {
    expect(
      parse('ORG;SORT-AS="Example,Org":Example Org').ORG?.[0].parameters[
        "SORT-AS"
      ]
    ).toEqual(["Example", "Org"])
  })

  it("reads the GEO parameter as coordinates", () => {
    expect(
      parse('ADR;GEO="geo:12.3457,78.910":;;1 Example St.;;;;').ADR?.[0]
        .parameters.GEO
    ).toEqual([{ lat: 12.3457, lng: 78.91 }])
  })

  it("drops a GEO parameter that is not a geo URI", () => {
    expect(
      parse('ADR;GEO="not a location":;;1 Example St.;;;;').ADR?.[0].parameters
    ).toEqual({})
  })

  it("reads the TZ parameter", () => {
    expect(
      parse("ADR;TZ=Europe/Warsaw:;;1 Example St.;;;;").ADR?.[0].parameters.TZ
    ).toEqual(["Europe/Warsaw"])
  })

  it("drops a parameter it does not know", () => {
    expect(parse("NOTE;X-EXAMPLE=1:Example note").NOTE?.[0].parameters).toEqual(
      {}
    )
  })
})

describe("quoted parameter values", () => {
  // RFC 6350 sec. 3.3 allows any parameter value to be written in quotes, and
  // sec. 5.10 requires it for GEO, whose geo URI holds a colon.
  const parse = parse40

  it("reads a quoted VALUE parameter", () => {
    expect(
      parse('NOTE;VALUE="text":Example note').NOTE?.[0].parameters.VALUE
    ).toEqual(["text"])
  })

  it("reads a quoted PREF parameter", () => {
    expect(parse('TEL;PREF="1":123456789').TEL?.[0].parameters.PREF).toEqual([
      1,
    ])
  })

  it("reads a quoted PID parameter", () => {
    expect(parse('TEL;PID="1.1":123456789').TEL?.[0].parameters.PID).toEqual([
      "1.1",
    ])
  })

  it("reads a quoted MEDIATYPE parameter", () => {
    expect(
      parse('URL;MEDIATYPE="text/html":http://example.com').URL?.[0].parameters
        .MEDIATYPE
    ).toEqual(["text/html"])
  })
})

describe("encoding parameters (vCard 3.0)", () => {
  const parse = parse30

  it("decodes a quoted-printable value", () => {
    const contact = parse(
      "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:za=C5=BC=C3=B3=C5=82=C4=87"
    )

    expect(contact.NOTE?.[0].value).toBe("zażółć")
  })

  it("decodes a base64 value", () => {
    const encoded = Buffer.from("Example note").toString("base64")
    const contact = parse(`NOTE;ENCODING=BASE64;CHARSET=UTF-8:${encoded}`)

    expect(contact.NOTE?.[0].value).toBe("Example note")
  })

  it("falls back to utf-8 for a charset it does not know", () => {
    const contact = parse(
      "NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=NOT-A-CHARSET:za=C5=BC"
    )

    expect(contact.NOTE?.[0].value).toBe("zaż")
  })

  it("does not expose the encoding parameters as parameters", () => {
    const contact = parse("NOTE;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:plain")

    expect(contact.NOTE?.[0].parameters).toEqual({})
  })
})

describe("TEL value parsing (vCard 4.0)", () => {
  const parse = parse40

  it("strips a scheme other than tel from a URI value", () => {
    expect(
      parse("TEL;VALUE=uri:sip:user@example.com").TEL?.[0].value.phoneNumber
    ).toBe("user@example.com")
  })

  it("reads a tel URI that carries no parameters", () => {
    expect(parse("TEL;VALUE=uri:tel:123456789").TEL?.[0].value).toEqual({
      phoneNumber: "123456789",
      extension: undefined,
    })
  })

  it("leaves a plain value alone when VALUE=uri is absent", () => {
    expect(parse("TEL:123456789").TEL?.[0].value).toEqual({
      phoneNumber: "123456789",
    })
  })

  it("keeps a semicolon inside a plain value", () => {
    expect(parse("TEL:123;456").TEL?.[0].value.phoneNumber).toBe("123;456")
  })
})

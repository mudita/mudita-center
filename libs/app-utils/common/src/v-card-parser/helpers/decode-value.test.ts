/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { decodeValue } from "./decode-value"

describe("decodeValue", () => {
  describe("quoted-printable encoding", () => {
    it("decodes basic ASCII characters", () => {
      const result = decodeValue("=48=65=6C=6C=6F", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("Hello")
    })

    it("decodes UTF-8 Polish characters", () => {
      const result = decodeValue("=C4=85=C4=87=C4=99", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("decodes ISO-8859-1 special characters", () => {
      const result = decodeValue("=E9=E8=E0", "iso-8859-1", "QUOTED-PRINTABLE")
      expect(result).toBe("éèà")
    })

    it("decodes ISO-8859-2 Polish characters", () => {
      const result = decodeValue("=B1=E6=EA", "iso-8859-2", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("decodes Windows-1250 Polish characters", () => {
      const result = decodeValue("=B9=E6=EA", "windows-1250", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("decodes mixed plain text and encoded characters", () => {
      const result = decodeValue("Jan Kowalski =C5=81=C3=B3d=C5=BA", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("Jan Kowalski Łódź")
    })

    it("removes soft line breaks", () => {
      const result = decodeValue("Hello=\r\nWorld", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("HelloWorld")
    })

    it("removes soft line breaks with LF only", () => {
      const result = decodeValue("Hello=\nWorld", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("HelloWorld")
    })

    it("handles lowercase hex digits", () => {
      const result = decodeValue("=c4=85=c4=87", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("ąć")
    })

    it("returns original value for invalid QP sequence", () => {
      const result = decodeValue("=ZZ=XX", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("=ZZ=XX")
    })

    it("handles case-insensitive encoding type", () => {
      const result = decodeValue("=48=65=6C=6C=6F", "utf-8", "quoted-printable")
      expect(result).toBe("Hello")
    })

    it("handles Q encoding alias", () => {
      const result = decodeValue("=48=65=6C=6C=6F", "utf-8", "Q")
      expect(result).toBe("Hello")
    })
  })

  describe("base64 encoding", () => {
    it("decodes basic ASCII text", () => {
      const result = decodeValue("SGVsbG8=", "utf-8", "BASE64")
      expect(result).toBe("Hello")
    })

    it("decodes UTF-8 text with Polish characters", () => {
      const result = decodeValue("xIXEh8SZ", "utf-8", "BASE64")
      expect(result).toBe("ąćę")
    })

    it("decodes Windows-1250 text with Polish characters via base64", () => {
      const result = decodeValue("uebq", "windows-1250", "BASE64")
      expect(result).toBe("ąćę")
    })

    it("decodes base64 without padding", () => {
      const result = decodeValue("SGVsbG8", "utf-8", "BASE64")
      expect(result).toBe("Hello")
    })

    it("handles B encoding alias (vCard 2.1)", () => {
      const result = decodeValue("SGVsbG8=", "utf-8", "B")
      expect(result).toBe("Hello")
    })

    it("handles lowercase b encoding alias", () => {
      const result = decodeValue("SGVsbG8=", "utf-8", "b")
      expect(result).toBe("Hello")
    })

    it("handles multi-line base64 with whitespace", () => {
      const result = decodeValue("SGVs\r\nbG8=", "utf-8", "BASE64")
      expect(result).toBe("Hello")
    })

    it("handles case-insensitive encoding type", () => {
      const result = decodeValue("SGVsbG8=", "utf-8", "bAsE64")
      expect(result).toBe("Hello")
    })

    it("returns empty string for corrupted base64", () => {
      const result = decodeValue("!!!!", "utf-8", "BASE64")
      expect(result).toBe("")
    })

    it("handles empty input", () => {
      const result = decodeValue("", "utf-8", "BASE64")
      expect(result).toBe("")
    })
  })

  describe("no encoding", () => {
    it("returns original value when encoding type is empty", () => {
      const result = decodeValue("Hello", "utf-8", "")
      expect(result).toBe("Hello")
    })

    it("returns original value for unsupported encoding type", () => {
      const result = decodeValue("Hello", "utf-8", "UNSUPPORTED")
      expect(result).toBe("Hello")
    })

    it("preserves special characters without encoding", () => {
      const result = decodeValue("ąćę", "utf-8", "")
      expect(result).toBe("ąćę")
    })
  })

  describe("charset normalization", () => {
    it("normalizes UTF-8 variations", () => {
      const result = decodeValue("=C4=85", "UTF_8", "QUOTED-PRINTABLE")
      expect(result).toBe("ą")
    })

    it("normalizes latin1 to iso-8859-1", () => {
      const result = decodeValue("=E9=E8=E0", "latin1", "QUOTED-PRINTABLE")
      expect(result).toBe("éèà")
    })

    it("normalizes latin2 to iso-8859-2", () => {
      const result = decodeValue("=B1=E6=EA", "latin2", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("normalizes cp1250 to windows-1250", () => {
      const result = decodeValue("=B9=E6=EA", "cp1250", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("normalizes win1250 to windows-1250", () => {
      const result = decodeValue("=B9=E6=EA", "win1250", "QUOTED-PRINTABLE")
      expect(result).toBe("ąćę")
    })

    it("handles US-ASCII charset", () => {
      const result = decodeValue("=48=65=6C=6C=6F", "US-ASCII", "QUOTED-PRINTABLE")
      expect(result).toBe("Hello")
    })
  })

  describe("real vCard examples", () => {
    it("decodes vCard 2.1 Polish name with CHARSET and QUOTED-PRINTABLE", () => {
      const result = decodeValue("Jan=20Kowalski", "utf-8", "QUOTED-PRINTABLE")
      expect(result).toBe("Jan Kowalski")
    })

    it("decodes vCard 2.1 address with Windows-1250", () => {
      const result = decodeValue("ul.=20=A3=F3dzka=2010", "windows-1250", "QUOTED-PRINTABLE")
      expect(result).toBe("ul. Łódzka 10")
    })

    it("decodes vCard 3.0 photo placeholder (base64)", () => {
      const result = decodeValue("UE5HX0lNQUdF", "utf-8", "BASE64")
      expect(result).toBe("PNG_IMAGE")
    })

    it("decodes Cyrillic text with windows-1251", () => {
      const result = decodeValue("=CF=F0=E8=E2=E5=F2", "windows-1251", "QUOTED-PRINTABLE")
      expect(result).toBe("Привет")
    })

    it("decodes German umlauts with iso-8859-1", () => {
      const result = decodeValue("=FC=F6=E4", "iso-8859-1", "QUOTED-PRINTABLE")
      expect(result).toBe("üöä")
    })
  })
})

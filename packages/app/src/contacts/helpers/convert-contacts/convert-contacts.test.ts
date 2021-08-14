/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { Contact } from "App/contacts/store/contacts.type"
import convertContacts from "App/contacts/helpers/convert-contacts/convert-contacts"

describe("Convert Contact helper", () => {
  describe("when just a single contact is converted", () => {
    const contacts: Contact[] = [
      {
        id: "abc-123",
        firstName: "John",
        lastName: "Doe",
        email: "example@mudita.com",
        primaryPhoneNumber: "123 456 789",
        secondaryPhoneNumber: "32 123 44 55",
        firstAddressLine: "4929 Pine Garden Lane",
        secondAddressLine: "Atlanta, GA, 30339, USA",
        note:
          "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
      },
    ]

    test("should return vCard format with a single contact", () => {
      const result = convertContacts(contacts)
      expect(result).toMatchInlineSnapshot(`
        "BEGIN:VCARD
        VERSION:4.0
        N:Doe;John;;;
        FN:John Doe
        TEL;TYPE=voice:123 456 789
        TEL;TYPE=voice:32 123 44 55
        ADR;TYPE=home;LABEL=\\"4929 Pine Garden Lane Atlanta, GA, 30339, USA\\":;;4929
          Pine Garden Lane;Atlanta; GA; 30339; USA
        EMAIL:example@mudita.com
        NOTE;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:Vestibulum ac diam sit amet
          quam vehicula elementum sed sit amet dui. Pelle=ntesque in ipsum id orci
          porta dapibus.
        UID:abc-123
        END:VCARD"
      `)
    })

    test("a result should allows to be parse by vCard ", () => {
      const result = convertContacts(contacts)
      expect(() => vCard.parse(result)).not.toThrow()
    })
  })

  describe("when a single contact has special characters", () => {
    const contacts: Contact[] = [
      {
        id: "abc-123",
        firstName: "是",
        lastName: "Jürgen",
        primaryPhoneNumber: "123456789",
        secondaryPhoneNumber: "321234455",
        firstAddressLine: "Saudi Arabia, 11564, Arabia",
        secondAddressLine: "اكتشف",
      },
    ]

    test("should return vCard format with a single contact", () => {
      const result = convertContacts(contacts)
      expect(result).toMatchInlineSnapshot(`
        "BEGIN:VCARD
        VERSION:4.0
        N;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:J=C3=BCrgen;=E6=98=AF;;;
        FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:=E6=98=AF J=C3=BCrgen
        TEL;TYPE=voice:123456789
        TEL;TYPE=voice:321234455
        ADR;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE;TYPE=home;LABEL=\\"Saudi Arabia,
          11564, Arabia اكتشف\\":;;Saudi Arabia; 11564;
          Arabia;=D8=A7=D9=83=D8=AA=D8=B4=D9=81;
        UID:abc-123
        END:VCARD"
      `)
    })

    test("a result should allows to be parse by vCard ", () => {
      const result = convertContacts(contacts)
      expect(() => vCard.parse(result)).not.toThrow()
    })
  })

  describe("when multiple contacts are converted", () => {
    const contacts: Contact[] = [
      {
        id: "abc-123",
        firstName: "John",
        lastName: "Doe",
        email: "example@mudita.com",
        primaryPhoneNumber: "123 456 789",
        secondaryPhoneNumber: "32 123 44 55",
        firstAddressLine: "4929 Pine Garden Lane",
        secondAddressLine: "Atlanta, GA, 30339, USA",
        note:
          "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
      },
      {
        id: "def-456",
        firstName: "Jane",
        email: "example@mudita.com",
        primaryPhoneNumber: "123 456 789",
        firstAddressLine: "5000 Random Street",
        secondAddressLine: "Atlanta, GA, 30339, USA",
      },
    ]

    test("should return vCard format with a contact list", () => {
      const result = convertContacts(contacts)
      expect(result).toMatchInlineSnapshot(`
        "BEGIN:VCARD
        VERSION:4.0
        N:Doe;John;;;
        FN:John Doe
        TEL;TYPE=voice:123 456 789
        TEL;TYPE=voice:32 123 44 55
        ADR;TYPE=home;LABEL=\\"4929 Pine Garden Lane Atlanta, GA, 30339, USA\\":;;4929
          Pine Garden Lane;Atlanta; GA; 30339; USA
        EMAIL:example@mudita.com
        NOTE;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:Vestibulum ac diam sit amet
          quam vehicula elementum sed sit amet dui. Pelle=ntesque in ipsum id orci
          porta dapibus.
        UID:abc-123
        END:VCARD
        BEGIN:VCARD
        VERSION:4.0
        N:;Jane;;;
        FN:Jane
        TEL;TYPE=voice:123 456 789
        ADR;TYPE=home;LABEL=\\"5000 Random Street Atlanta, GA, 30339, USA\\":;;5000
          Random Street;Atlanta; GA; 30339; USA
        EMAIL:example@mudita.com
        UID:def-456
        END:VCARD"
      `)
    })

    test("a result should allows to be parse by vCard ", () => {
      const result = convertContacts(contacts)
      expect(() => vCard.parse(result)).not.toThrow()
    })
  })

  describe("when a contact with second address line as undefined", () => {
    const contacts: Contact[] = [
      {
        id: "ae193f79-a65b-4b36-bef7-b6b6532811ca",
        firstName: "Carmelo",
        primaryPhoneNumber: "+98007298780",
        firstAddressLine: "935 Gwen Park",
      },
    ]

    test("should convert address field properly", () => {
      const result = convertContacts(contacts)
      expect(result).toMatchInlineSnapshot(`
        "BEGIN:VCARD
        VERSION:4.0
        N:;Carmelo;;;
        FN:Carmelo
        TEL;TYPE=voice:+98007298780
        ADR;TYPE=home;LABEL=\\"935 Gwen Park\\":;;935 Gwen Park;;;;
        UID:ae193f79-a65b-4b36-bef7-b6b6532811ca
        END:VCARD"
      `)
    })
  })

  describe("when a contact with first address line as undefined", () => {
    const contacts: Contact[] = [
      {
        id: "ae193f79-a65b-4b36-bef7-b6b6532811cb",
        firstName: "Kareem",
        primaryPhoneNumber: "+98007298785",
        secondAddressLine: "800 East Gwen Street, Phoenix",
      },
    ]

    test("should convert address field properly", () => {
      const result = convertContacts(contacts)
      expect(result).toMatchInlineSnapshot(`
        "BEGIN:VCARD
        VERSION:4.0
        N:;Kareem;;;
        FN:Kareem
        TEL;TYPE=voice:+98007298785
        ADR;TYPE=home;LABEL=\\"800 East Gwen Street, Phoenix\\":;;;800 East Gwen
          Street; Phoenix;;
        UID:ae193f79-a65b-4b36-bef7-b6b6532811cb
        END:VCARD"
      `)
    })
  })
})

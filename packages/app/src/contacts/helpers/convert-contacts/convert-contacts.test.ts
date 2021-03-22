/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import convertContacts from "App/contacts/helpers/convert-contacts/convert-contacts"
import vCard from "vcf"

test("single contact is properly converted to vCard format", () => {
  const result = convertContacts([
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
  ])
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
    NOTE:Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
      Pellentesque in ipsum id orci porta dapibus.
    UID:abc-123
    END:VCARD"
  `)
  expect(vCard.parse(result)).toMatchInlineSnapshot(`
    Array [
      Array [
        "vcard",
        Array [
          Array [
            "version",
            Object {},
            "text",
            "4.0",
          ],
          Array [
            "n",
            Object {},
            "text",
            Array [
              "Doe",
              "John",
              "",
              "",
              "",
            ],
          ],
          Array [
            "fn",
            Object {},
            "text",
            "John Doe",
          ],
          Array [
            "tel",
            Object {
              "type": "voice",
            },
            "text",
            "123 456 789",
          ],
          Array [
            "tel",
            Object {
              "type": "voice",
            },
            "text",
            "32 123 44 55",
          ],
          Array [
            "adr",
            Object {
              "label": "\\"4929 Pine Garden Lane Atlanta, GA, 30339, USA\\"",
              "type": "home",
            },
            "text",
            Array [
              "",
              "",
              "4929 Pine Garden Lane",
              "Atlanta",
              " GA",
              " 30339",
              " USA",
            ],
          ],
          Array [
            "email",
            Object {},
            "text",
            "example@mudita.com",
          ],
          Array [
            "note",
            Object {},
            "text",
            "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
          ],
          Array [
            "uid",
            Object {},
            "text",
            "abc-123",
          ],
        ],
      ],
    ]
  `)
})

test("if second address line is undefined address field is converted properly", () => {
  const result = convertContacts([
    {
      id: "ae193f79-a65b-4b36-bef7-b6b6532811ca",
      firstName: "Carmelo",
      primaryPhoneNumber: "+98007298780",
      firstAddressLine: "935 Gwen Park",
    },
  ])
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

test("if first address line is undefined address field is converted properly", () => {
  const result = convertContacts([
    {
      id: "ae193f79-a65b-4b36-bef7-b6b6532811cb",
      firstName: "Kareem",
      primaryPhoneNumber: "+98007298785",
      secondAddressLine: "800 East Gwen Street, Phoenix",
    },
  ])
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

test("multiple contacts are properly converted to vCard format", () => {
  const result = convertContacts([
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
  ])
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
    NOTE:Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
      Pellentesque in ipsum id orci porta dapibus.
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
  expect(vCard.parse(result)).toMatchInlineSnapshot(`
    Array [
      Array [
        "vcard",
        Array [
          Array [
            "version",
            Object {},
            "text",
            "4.0",
          ],
          Array [
            "n",
            Object {},
            "text",
            Array [
              "Doe",
              "John",
              "",
              "",
              "",
            ],
          ],
          Array [
            "fn",
            Object {},
            "text",
            "John Doe",
          ],
          Array [
            "tel",
            Object {
              "type": "voice",
            },
            "text",
            "123 456 789",
          ],
          Array [
            "tel",
            Object {
              "type": "voice",
            },
            "text",
            "32 123 44 55",
          ],
          Array [
            "adr",
            Object {
              "label": "\\"4929 Pine Garden Lane Atlanta, GA, 30339, USA\\"",
              "type": "home",
            },
            "text",
            Array [
              "",
              "",
              "4929 Pine Garden Lane",
              "Atlanta",
              " GA",
              " 30339",
              " USA",
            ],
          ],
          Array [
            "email",
            Object {},
            "text",
            "example@mudita.com",
          ],
          Array [
            "note",
            Object {},
            "text",
            "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
          ],
          Array [
            "uid",
            Object {},
            "text",
            "abc-123",
          ],
        ],
      ],
      Array [
        "vcard",
        Array [
          Array [
            "version",
            Object {},
            "text",
            "4.0",
          ],
          Array [
            "n",
            Object {},
            "text",
            Array [
              "",
              "Jane",
              "",
              "",
              "",
            ],
          ],
          Array [
            "fn",
            Object {},
            "text",
            "Jane",
          ],
          Array [
            "tel",
            Object {
              "type": "voice",
            },
            "text",
            "123 456 789",
          ],
          Array [
            "adr",
            Object {
              "label": "\\"5000 Random Street Atlanta, GA, 30339, USA\\"",
              "type": "home",
            },
            "text",
            Array [
              "",
              "",
              "5000 Random Street",
              "Atlanta",
              " GA",
              " 30339",
              " USA",
            ],
          ],
          Array [
            "email",
            Object {},
            "text",
            "example@mudita.com",
          ],
          Array [
            "uid",
            Object {},
            "text",
            "def-456",
          ],
        ],
      ],
    ]
  `)
})

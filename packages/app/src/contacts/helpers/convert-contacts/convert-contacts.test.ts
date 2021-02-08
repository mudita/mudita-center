import convertContacts from "App/contacts/helpers/convert-contacts/convert-contacts"
import vCard from "vcf"

test("single contact is properly converted to vCard format", () => {
  const result = convertContacts([
    {
      id: "abc-123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
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
    EMAIL:john.doe@example.com
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
            "john.doe@example.com",
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

test("multiple contacts are properly converted to vCard format", () => {
  const result = convertContacts([
    {
      id: "abc-123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
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
      email: "john.doe@example.com",
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
    EMAIL:john.doe@example.com
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
    EMAIL:john.doe@example.com
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
            "john.doe@example.com",
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
            "john.doe@example.com",
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

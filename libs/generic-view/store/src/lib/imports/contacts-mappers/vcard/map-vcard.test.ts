/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { jCard, mapVcard } from "./map-vcard"
import { ContactAddSource } from "device/models"

describe("mapVcard", () => {
  it("should map vCard in jCard format properly", () => {
    const jCard: jCard[] = [
      [
        "vcard",
        [
          ["version", {}, "text", "4.0"],
          ["n", {}, "text", ["Gump", "Forrest", "Alexander", "Mr.", "Jr."]],
          ["fn", {}, "text", "Forrest Gump"],
          ["org", {}, "text", "Bubba Gump Shrimp Co."],
          ["title", {}, "text", "Shrimp Man"],
          ["nickname", {}, "text", "Forrest"],
          [
            "tel",
            {
              type: ["work", "voice"],
              value: "uri",
            },
            "uri",
            "tel:+11115551212",
          ],
          [
            "tel",
            {
              type: ["home", "voice"],
              value: "uri",
            },
            "uri",
            "tel:+14045551212",
          ],
          [
            "adr",
            {
              label:
                '"100 Waters Edge\\nBaytown, LA 30314\\nUnited States of America"',
              type: "work",
            },
            "text",
            [
              "",
              "",
              "100 Waters Edge",
              "Baytown",
              "LA",
              "30314",
              "United States of America",
            ],
          ],
          [
            "adr",
            {
              label:
                '"42 Plantation St.\\nBaytown, LA 30314\\nUnited States ofAmerica"',
              type: "home",
            },
            "text",
            [
              "",
              "",
              "42 Plantation St.",
              "Baytown",
              "LA",
              "30314",
              "United States ofAmerica",
            ],
          ],
          ["email", {}, "text", "forrestgump@example.com"],
          ["rev", {}, "text", "20080424T195243Z"],
          ["note", {}, "text", "The guy who ran for 3 years."],
        ],
      ],
    ]
    expect(mapVcard(jCard)).toEqual([
      {
        addresses: [
          {
            city: "Baytown",
            country: "United States of America",
            countryCode: "United States of America",
            postalCode: "30314",
            region: "LA",
            streetAddress: "100 Waters Edge",
            type: "work",
          },
          {
            city: "Baytown",
            country: "United States ofAmerica",
            countryCode: "United States ofAmerica",
            postalCode: "30314",
            region: "LA",
            streetAddress: "42 Plantation St.",
            type: "home",
          },
        ],
        displayName: "Forrest Alexander Gump",
        emailAddresses: [
          {
            value: "forrestgump@example.com",
          },
        ],
        firstName: "Forrest",
        honorificPrefix: "Mr.",
        honorificSuffix: "Jr.",
        id: "0",
        importSource: ContactAddSource.MCImportVCard,
        lastName: "Gump",
        middleName: "Alexander",
        nickname: "Forrest",
        note: "The guy who ran for 3 years.",
        organizations: [
          {
            name: "Bubba Gump Shrimp Co.",
            title: "Shrimp Man",
          },
        ],
        phoneNumbers: [
          {
            type: "voice",
            value: "+11115551212",
          },
          {
            type: "voice",
            value: "+14045551212",
          },
        ],
        urls: [],
      },
    ])
  })
})

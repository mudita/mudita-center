/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { parseVcard } from "./parse-vcard"

describe("parseVcard", () => {
  it("should parse simple vcard properly", () => {
    const vcard = `BEGIN:VCARD
VERSION:4.0
N:Gump;Forrest;;;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE=work,voice;VALUE=uri:tel:+11115551212
TEL;TYPE=home,voice;VALUE=uri:tel:+14045551212
ADR;TYPE=work;LABEL="100 Waters Edge\\nBaytown, LA 30314\\nUnited States
  of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=home;LABEL="42 Plantation St.\\nBaytown, LA 30314\\nUnited
  States ofAmerica":;;42 Plantation St.;Baytown;LA;30314;United States of
 America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD`
    expect(parseVcard(vcard)).toEqual([
      [
        "vcard",
        [
          ["version", {}, "text", "4.0"],
          ["n", {}, "text", ["Gump", "Forrest", "", "", ""]],
          ["fn", {}, "text", "Forrest Gump"],
          ["org", {}, "text", "Bubba Gump Shrimp Co."],
          ["title", {}, "text", "Shrimp Man"],
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
        ],
      ],
    ])
  })
})

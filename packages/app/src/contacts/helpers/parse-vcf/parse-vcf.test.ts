/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import fs from "fs"
import path from "path"
import mime from "mime-types"
import parseVcf, { readFile } from "./parse-vcf"

const createFile = (filePath: string) => {
  const { mtimeMs: lastModified } = fs.statSync(filePath)

  return new File([fs.readFileSync(filePath)], path.basename(filePath), {
    lastModified,
    type: mime.lookup(filePath) || "",
  })
}

test("reading vcf file works properly", async () => {
  expect(
    await readFile(createFile(path.join(__dirname, "./single-contact.vcf")))
  ).toMatchInlineSnapshot(`
    "BEGIN:VCARD
    VERSION:3.0
    PRODID:-//Apple Inc.//macOS 11.0.1//EN
    N:Doe;John;;;
    FN:John Doe
    EMAIL;type=INTERNET;type=HOME;type=pref:john.doe@example.com
    TEL;type=CELL;type=VOICE;type=pref:123 456 789
    TEL;type=HOME;type=VOICE:32 123 44 55
    ADR;type=HOME;type=pref:;;4929 Pine Garden Lane;Atlanta;;GA 30339;USA
    NOTE:Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.
    END:VCARD
    "
  `)
})

test("parsing vCard contact works properly", async () => {
  expect(
    await parseVcf([createFile(path.join(__dirname, "./single-contact.vcf"))])
  ).toStrictEqual([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      primaryPhoneNumber: "123 456 789",
      secondaryPhoneNumber: "32 123 44 55",
      firstAddressLine: "4929 Pine Garden Lane, Atlanta",
      secondAddressLine: "GA 30339, USA",
      note: "Vestibulum ac diam sit amet qu",
    },
  ])
})

test("parsing multiple vCard contacts works properly", async () => {
  expect(
    await parseVcf([
      createFile(path.join(__dirname, "./multiple-contacts.vcf")),
    ])
  ).toStrictEqual([
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      primaryPhoneNumber: "987 654 321",
      secondaryPhoneNumber: "",
      firstAddressLine: "",
      secondAddressLine: "",
      note: "Nulla quis lorem ut libero mal",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      primaryPhoneNumber: "123 456 789",
      secondaryPhoneNumber: "32 123 44 55",
      firstAddressLine: "4929 Pine Garden Lane, Atlanta",
      secondAddressLine: "GA 30339, USA",
      note: "Vestibulum ac diam sit amet qu",
    },
  ])
})

test("parsing multiple vcf files works properly", async () => {
  expect(
    await parseVcf([
      createFile(path.join(__dirname, "./single-contact.vcf")),
      createFile(path.join(__dirname, "./multiple-contacts.vcf")),
    ])
  ).toHaveLength(3)
})

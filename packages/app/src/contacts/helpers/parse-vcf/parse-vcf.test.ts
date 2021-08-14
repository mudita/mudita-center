/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import createFile from "Renderer/utils/create-file"
import parseVcf from "./parse-vcf"

test("parsing vCard contact works properly", async () => {
  expect(
    await parseVcf([createFile(path.join(__dirname, "./single-contact.vcf"))])
  ).toStrictEqual([
    {
      firstName: "John",
      lastName: "Doe",
      email: "example@mudita.com",
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
      email: "example@mudita.com",
      primaryPhoneNumber: "987 654 321",
      secondaryPhoneNumber: "",
      firstAddressLine: "",
      secondAddressLine: "",
      note: "Nulla quis lorem ut libero mal",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "example@mudita.com",
      primaryPhoneNumber: "123 456 789",
      secondaryPhoneNumber: "32 123 44 55",
      firstAddressLine: "4929 Pine Garden Lane, Atlanta",
      secondAddressLine: "GA 30339, USA",
      note: "Vestibulum ac diam sit amet qu",
    },
  ])
})

test("parsing encoded vCard works properly", async () => {
  expect(
    await parseVcf([
      createFile(path.join(__dirname, "./single-encoded-contact.vcf")),
    ])
  ).toStrictEqual([
    {
      firstName: "是",
      lastName: "Jürgen",
      email: "example@mudita.com",
      primaryPhoneNumber: "123 456 789",
      secondaryPhoneNumber: "32 123 44 55",
      firstAddressLine: "Saudi Arabia, 11564, Arabia",
      secondAddressLine: "",
      note: "اكتشف",
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import createFile from "Renderer/utils/create-file/create-file"
import parseVcf from "./parse-vcf"

describe("Parse VCF helper", () => {
  const singleContactFile = createFile(
    path.join(__dirname, "./single-contact.vcf")
  )
  const multipleContactsFile = createFile(
    path.join(__dirname, "./multiple-contacts.vcf")
  )
  const encodedContactFile = createFile(
    path.join(__dirname, "./encoded-contact.vcf")
  )

  test("should return list with one contact when is just single record", async () => {
    const contacts = await parseVcf([singleContactFile])
    expect(contacts).toStrictEqual([
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

  test("should return contact list when in a file is multiple records", async () => {
    const contacts = await parseVcf([multipleContactsFile])
    expect(contacts).toHaveLength(2)
  })

  test("should handle list of files", async () => {
    const contacts = await parseVcf([singleContactFile, multipleContactsFile])
    expect(contacts).toHaveLength(3)
  })

  test("should decode records file when are encoded", async () => {
    const contacts = await parseVcf([encodedContactFile])
    expect(contacts).toStrictEqual([
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
})

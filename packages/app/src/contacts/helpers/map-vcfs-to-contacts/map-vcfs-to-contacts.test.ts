/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import createFile from "App/__deprecated__/renderer/utils/create-file/create-file"
import mapVCFsToContacts from "./map-vcfs-to-contacts"

describe("map VCF's to Contacts helper", () => {
  const singleContactFile = createFile(
    path.join(__dirname, "./single-contact.vcf")
  )
  const multipleContactsFile = createFile(
    path.join(__dirname, "./multiple-contacts.vcf")
  )
  const emptyContact = createFile(path.join(__dirname, "./empty-contact.vcf"))
  const multipleContactsWithEmpty = createFile(
    path.join(__dirname, "./multiple-contacts-with-empty.vcf")
  )
  const encodedContactFile = createFile(
    path.join(__dirname, "./encoded-contact.vcf")
  )
  const noEncodedContactFile = createFile(
    path.join(__dirname, "./no-encoded-contact.vcf")
  )
  const withPolishCharsContactFile = createFile(
    path.join(__dirname, "./utf-8-polish-characters.vcf")
  )
  const contactWithEmailListFile = createFile(
    path.join(__dirname, "./contact-with-email-list.vcf")
  )
  const noVcfFile = createFile(path.join(__dirname, "./no-vcf.png"))

  test("should return list with one contact when is just single record", async () => {
    const contacts = await mapVCFsToContacts([singleContactFile])
    expect(contacts).toStrictEqual([
      {
        firstName: "John",
        lastName: "Doe",
        email: "example@mudita.com",
        primaryPhoneNumber: "123456789",
        secondaryPhoneNumber: "321234455",
        firstAddressLine: "4929 Pine Garden Lane, Atlanta",
        secondAddressLine: "GA 30339, USA",
        note: "Vestibulum ac diam sit amet qu",
      },
    ])
  })

  test("should return contact list when in a file is multiple records", async () => {
    const contacts = await mapVCFsToContacts([multipleContactsFile])
    expect(contacts).toHaveLength(2)
  })

  test("when contact is empty the import should return empty array", async () => {
    const contacts = await mapVCFsToContacts([emptyContact])
    expect(contacts).toMatchInlineSnapshot(`Array []`)
  })

  test("should skip empty contacts", async () => {
    const contacts = await mapVCFsToContacts([multipleContactsWithEmpty])
    expect(contacts).toHaveLength(2)
  })

  test("should handle list of files", async () => {
    const contacts = await mapVCFsToContacts([
      singleContactFile,
      multipleContactsFile,
    ])
    expect(contacts).toHaveLength(3)
  })

  test("should decode records file when are encoded", async () => {
    const contacts = await mapVCFsToContacts([encodedContactFile])
    expect(contacts).toStrictEqual([
      {
        firstName: "是",
        lastName: "Jürgen",
        primaryPhoneNumber: "123456789",
        secondaryPhoneNumber: "321234455",
        firstAddressLine: "Saudi Arabia, 11564, Arabia",
        secondAddressLine: "اكتشف",
      },
    ])
  })

  test("should return contact even the record isn't decode properly", async () => {
    const contacts = await mapVCFsToContacts([noEncodedContactFile])
    expect(contacts).toStrictEqual([
      {
        firstName: "是",
        lastName: "Jürgen",
        primaryPhoneNumber: "123456789",
        secondaryPhoneNumber: "321234455",
        firstAddressLine: "Saudi Arabia, 11564, Arabia",
        secondAddressLine: "اكتشف",
      },
    ])
  })

  test("should return contact with file that contains polish characters", async () => {
    const contacts = await mapVCFsToContacts([withPolishCharsContactFile])
    expect(contacts).toMatchInlineSnapshot(`
      Array [
        Object {
          "firstName": "NąMĘ ąłść",
          "lastName": "SURNąMę",
          "primaryPhoneNumber": "123456789",
        },
      ]
    `)
  })

  test("should return contact with email separated by coma if `vcf` with email list has been provided", async () => {
    const contacts = await mapVCFsToContacts([contactWithEmailListFile])
    expect(contacts).toStrictEqual([
      {
        primaryPhoneNumber: "664364535",
        note: "Some note",
        email: "lukasz.jarkowski@mudita.com, mudita.ex@hotmail.com",
        firstName: "Łukasz 1",
        lastName: "Jark",
      },
    ])
  })

  test("should return empty list when the file format isn't vcf", async () => {
    const contacts = await mapVCFsToContacts([noVcfFile])
    expect(contacts).toStrictEqual([])
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import utf8 from "utf8"
import quotedPrintable from "quoted-printable"
import { NewContact } from "App/contacts/reducers/contacts.interface"
import mapFileToString from "App/__deprecated__/renderer/utils/map-file-to-string/map-file-to-string"

type vCardProperty = vCard.Property & {
  charset?: "UTF-8" | string
}

type vCardContact = Record<string, vCardProperty | vCardProperty[]>

const mapToContact = (vContact: vCardContact): NewContact => {
  const contact: NewContact = {}
  const decodedValues = getVCardDecodedValues(vContact)

  assertValueIsStringNotArray(decodedValues.n, "name")
  assertValueIsStringNotArray(decodedValues.fv, "full name")
  const [lastName = "", firstName = ""] = decodedValues.n.split(";")
  const fullName = decodedValues.fv

  if (decodedValues.tel) {
    if (Array.isArray(decodedValues.tel)) {
      contact["primaryPhoneNumber"] = decodedValues.tel[0]
        .valueOf()
        .replace(/\s/g, "")
      contact["secondaryPhoneNumber"] = decodedValues.tel[1]
        .valueOf()
        .replace(/\s/g, "")
    } else {
      contact["primaryPhoneNumber"] = decodedValues.tel.replace(/\s/g, "")
    }
  }
  if (decodedValues.adr) {
    let address: string
    let firstAddressLine = ""
    let secondAddressLine = ""

    if (Array.isArray(decodedValues.adr)) {
      address = decodedValues.adr[0]
    } else {
      address = decodedValues.adr
    }

    address.split(";").forEach((chunk) => {
      const trimmedChunk = chunk.trim()
      const { length } = trimmedChunk

      if (length) {
        if (firstAddressLine.length + length <= 30) {
          firstAddressLine += `${trimmedChunk}, `
        } else if (secondAddressLine.length + length <= 30) {
          secondAddressLine += `${trimmedChunk}, `
        }
      }
    })

    contact["firstAddressLine"] = firstAddressLine.trim().slice(0, -1)
    contact["secondAddressLine"] = secondAddressLine.trim().slice(0, -1)
  }

  if (decodedValues.note) {
    assertValueIsStringNotArray(decodedValues.note, "note")
    contact["note"] = decodedValues.note.substring(0, 30)
  }

  if (decodedValues.email) {
    assertValueIsStringNotArray(decodedValues.email, "email")
    contact["email"] = decodedValues.email
  }

  contact["firstName"] = !firstName && !lastName ? fullName : firstName
  contact["lastName"] = lastName

  return contact
}

const getVCardDecodedValues = (
  vContact: vCardContact
): Record<string, string | string[]> => {
  return Object.fromEntries(
    Object.entries(vContact).map(([key, property]) => [
      key,
      getValueFromProperty(property),
    ])
  )
}

const getValueFromProperty = (property: vCardProperty | vCardProperty[]) => {
  if (Array.isArray(property)) {
    return property.map((prop) => decodeIfNeeded(prop.valueOf(), prop.charset))
  } else {
    return decodeIfNeeded(property.valueOf(), property.charset)
  }
}

const decodeIfNeeded = (value: string, charset: string | undefined) => {
  if (charset === "UTF-8") {
    const print = quotedPrintable.decode(value)
    return utf8.decode(print)
  }

  return value
}

function assertValueIsStringNotArray(
  value: string | string[],
  fieldName: string
): asserts value is string {
  if (Array.isArray(value)) {
    throw new Error(
      `${fieldName} should be a string, but the value is an array!`
    )
  }
}

const mapVCFsToContacts = async (files: File[]): Promise<NewContact[]> => {
  try {
    const contacts: NewContact[] = []

    for (const file of files) {
      let fileString = await mapFileToString(file)
      if (!fileString.includes("\r\n")) {
        fileString = fileString.replace(/\n/g, "\r\n")
      }
      const vCards = vCard.parse(fileString)
      vCards.forEach(({ data }) => contacts.push(mapToContact(data)))
    }

    return contacts
  } catch {
    return []
  }
}

export default mapVCFsToContacts

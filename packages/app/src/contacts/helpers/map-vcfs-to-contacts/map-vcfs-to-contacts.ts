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

class vcfPresenter {
  static getFirstName(
    decodedValues: Record<string, string | string[]>
  ): string {
    const n = vcfPresenter.getValueFromArray(decodedValues.n, 0)
    const first = vcfPresenter.mapRecordToValue(decodedValues.first)
    return n ?? first ?? ""
  }

  static getLastName(decodedValues: Record<string, string | string[]>): string {
    const n = vcfPresenter.getValueFromArray(decodedValues.n, 1)
    const last = vcfPresenter.mapRecordToValue(decodedValues.last)
    return n ?? last ?? ""
  }

  static getFullName(decodedValues: Record<string, string | string[]>): string {
    const fv = vcfPresenter.mapRecordToValue(decodedValues.fv)
    const fn = vcfPresenter.mapRecordToValue(decodedValues.fn)
    return fv ?? fn ?? ""
  }

  static getPrimaryPhoneNumber(
    decodedValues: Record<string, string | string[]>
  ): string {
    const tel = vcfPresenter.getValueFromArray(decodedValues.tel, 0)
    const rev = vcfPresenter.mapRecordToValue(decodedValues.rev)
    return vcfPresenter.mapTel(tel ?? rev ?? "")
  }
  static getSecondaryPhoneNumber(
    decodedValues: Record<string, string | string[]>
  ): string {
    const tel = vcfPresenter.getValueFromArray(decodedValues.tel, 1)
    return vcfPresenter.mapTel(tel ?? "")
  }

  private static mapTel(tel: string): string {
    return tel.valueOf().replace(/\s/g, "")
  }

  private static mapRecordToValue(
    value: string | string[]
  ): string | undefined {
    return !Array.isArray(value) ? value : undefined
  }
  private static getValueFromArray(
    value: string | string[],
    index: number
  ): string | undefined {
    return Array.isArray(value) ? value[index] : undefined
  }
}

const mapToContact = (vContact: vCardContact): NewContact => {
  const contact: NewContact = {}
  const decodedValues = getVCardDecodedValues(vContact)
  const firstName = vcfPresenter.getFirstName(decodedValues)
  const lastName = vcfPresenter.getLastName(decodedValues)
  const fullName = vcfPresenter.getFullName(decodedValues)
  const primaryPhoneNumber = vcfPresenter.getPrimaryPhoneNumber(decodedValues)
  const secondaryPhoneNumber =
    vcfPresenter.getSecondaryPhoneNumber(decodedValues)

  if (decodedValues.adr) {
    let address: string
    let firstAddressLine = ""
    let secondAddressLine = ""

    if (Array.isArray(decodedValues.adr)) {
      address = decodedValues.adr[0] ?? ""
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
  contact["primaryPhoneNumber"] = primaryPhoneNumber
  contact["secondaryPhoneNumber"] = secondaryPhoneNumber

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

const getValueFromProperty = (
  property: vCardProperty | vCardProperty[]
): string | string[] => {
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

const isEmptyContact = (contact: NewContact): boolean => {
  return Object.values(contact).every((value) => {
    return value === undefined || value === ""
  })
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

    return contacts.filter((contact) => !isEmptyContact(contact))
  } catch {
    return []
  }
}

export default mapVCFsToContacts

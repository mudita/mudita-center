/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import utf8 from "utf8"
import quotedPrintable from "quoted-printable"
import { NewContact } from "App/contacts/store/contacts.type"
import mapFileToString from "Renderer/utils/map-file-to-string/map-file-to-string"

type vCardContact = Record<string, vCard.Property | vCard.Property[]>

const mapToContact = (vContact: vCardContact): NewContact => {
  const contact: NewContact = {}
  const [lastName = "", firstName = ""] = (
    vContact.n?.valueOf() as string
  ).split(";")
  const fullName = vContact.fv?.valueOf() as string

  if (vContact.tel) {
    if (Array.isArray(vContact.tel)) {
      contact["primaryPhoneNumber"] = vContact.tel[0].valueOf()
      contact["secondaryPhoneNumber"] = vContact.tel[1].valueOf()
    } else {
      contact["primaryPhoneNumber"] = vContact.tel.valueOf()
    }
  }

  if (vContact.adr) {
    let address: string
    let firstAddressLine = ""
    let secondAddressLine = ""

    if (Array.isArray(vContact.adr)) {
      address = vContact.adr[0].valueOf()
    } else {
      address = vContact.adr.valueOf()
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

  if (vContact.note) {
    contact["note"] = (vContact.note.valueOf() as string).substr(0, 30)
  }

  if (vContact.email) {
    contact["email"] = vContact.email.valueOf() as string
  }

  contact["firstName"] = !firstName && !lastName ? fullName : firstName
  contact["lastName"] = lastName

  return decodeObject(contact)
}

const decodeObject = (
  object: Record<string, string | number | boolean | undefined>
): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, val]) => {
      if (typeof val === "string") {
        try {
          const print = quotedPrintable.decode(val)
          const decode = utf8.decode(print)
          return [key, decode]
        } catch {
          return [key, val]
        }
      } else {
        return [key, val]
      }
    })
  )
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

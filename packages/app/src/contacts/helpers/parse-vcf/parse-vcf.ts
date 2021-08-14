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

const parseContact = (contact: vCardContact): NewContact => {
  const newContact: NewContact = {}
  const [
    lastName = "",
    firstName = "",
  ] = (contact.n?.valueOf() as string).split(";")
  const fullName = contact.fv?.valueOf() as string

  if (contact.tel) {
    if (Array.isArray(contact.tel)) {
      newContact["primaryPhoneNumber"] = contact.tel[0].valueOf()
      newContact["secondaryPhoneNumber"] = contact.tel[1].valueOf()
    } else {
      newContact["primaryPhoneNumber"] = contact.tel.valueOf()
    }
  }

  if (contact.adr) {
    let address: string
    let firstAddressLine = ""
    let secondAddressLine = ""

    if (Array.isArray(contact.adr)) {
      address = contact.adr[0].valueOf()
    } else {
      address = contact.adr.valueOf()
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

    newContact["firstAddressLine"] = firstAddressLine.trim().slice(0, -1)
    newContact["secondAddressLine"] = secondAddressLine.trim().slice(0, -1)
  }

  if (contact.note) {
    newContact["note"] = (contact.note.valueOf() as string).substr(0, 30)
  }

  if (contact.email) {
    newContact["email"] = contact.email.valueOf() as string
  }

  newContact["firstName"] = !firstName && !lastName ? fullName : firstName
  newContact["lastName"] = lastName

  return decodeObject(newContact)
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

const parseVcf = async (files: File[]): Promise<NewContact[]> => {
  try {
    const parsedContacts: NewContact[] = []

    for (const file of files) {
      const contacts = vCard.parse(await mapFileToString(file))
      contacts.forEach(({ data }) => parsedContacts.push(parseContact(data)))
    }

    return parsedContacts
  } catch (error) {
    throw Error(error)
  }
}

export default parseVcf

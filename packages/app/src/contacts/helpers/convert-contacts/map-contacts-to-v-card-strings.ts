/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import utf8 from "utf8"
import quotedPrintable from "quoted-printable"

class EncoderVCard extends vCard {
  add(
    key: string,
    value: string,
    params?: { [key: string]: string | string[] }
  ): vCard {
    const input = utf8.encode(value)
    const encodedValue = input !== "" ? quotedPrintable.encode(utf8.encode(value)) : ""
    if (encodedValue === value) {
      return super.add(key, value, params)
    } else {
      return super.add(key, encodedValue, {
        charset: "UTF-8",
        encoding: "QUOTED-PRINTABLE",
        ...params,
      })
    }
  }
}

const mapToVCardString = (contact: Contact): string => {
  const {
    id,
    firstName = "",
    lastName = "",
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine = "",
    secondAddressLine = "",
    email,
    note,
  } = contact
  const card = new EncoderVCard()

  card.add("n", `${lastName};${firstName};;;`)
  card.add("fn", createFullName(contact))

  if (primaryPhoneNumber || secondaryPhoneNumber) {
    card.add("tel", primaryPhoneNumber || secondaryPhoneNumber || "", {
      type: ["voice"],
    })
  }

  if (primaryPhoneNumber && secondaryPhoneNumber) {
    card.add("tel", secondaryPhoneNumber, {
      type: ["voice"],
    })
  }

  if (firstAddressLine || secondAddressLine) {
    const [street, city, state, code, ...country] = (
      firstAddressLine +
      "," +
      secondAddressLine
    ).split(",")

    const address = `${firstAddressLine} ${secondAddressLine}`.trim()

    card.add(
      "adr",
      [
        "",
        "",
        street || "",
        city || "",
        state || "",
        code || "",
        country.join(" "),
      ].join(";"),
      {
        type: "home",
        label: `"${address}"`,
      }
    )
  }

  if (email) {
    card.add("email", email)
  }

  if (note) {
    card.add("note", note)
  }

  card.add("uid", id)

  return card.toString("4.0")
}

const mapContactsToVCardStrings = (contacts: Contact[]): string => {
  return contacts.map((contact) => mapToVCardString(contact)).join("\n")
}

export default mapContactsToVCardStrings

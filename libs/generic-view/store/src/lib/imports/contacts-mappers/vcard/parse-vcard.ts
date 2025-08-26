/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"
import { decode } from "quoted-printable"

export const parseVcard = (data: string) => {
  const fixedVcard = decodeQuotedPrintable(fixFormatting(data))
  try {
    const card = vCard.parse(fixedVcard)
    return card.map((vcard) => vcard.toJCard("4.0"))
  } catch (error) {
    console.error(error)
    throw new Error("File could not be parsed")
  }
}

const fixFormatting = (data: string) => {
  const clearPhotos = data.replace(/^PHOTO[^:]*:.*(\r?\n[ \t].*)*/gim, "")
  return clearPhotos.replace(/\r?\n/g, "\r\n")
}

const decodeQuotedPrintable = (data: string) => {
  return data.replace(
    /(FN|N|ORG|TITLE|ADR|EMAIL|NOTE)([^:]*):([^\r\n]*)/gi,
    (match, prop, attrs, value) => {
      if (/ENCODING=QUOTED-PRINTABLE/i.test(attrs)) {
        try {
          const byteString = decode(value)
          const buf = Buffer.from(byteString, "binary")
          const str = buf.toString("utf8")
          return `${prop}:${str}`
        } catch {
          return `${prop}:${value}`
        }
      }
      return match
    }
  )
}

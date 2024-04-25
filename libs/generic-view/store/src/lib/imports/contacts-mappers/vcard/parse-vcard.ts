/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import vCard from "vcf"

export const parseVcard = (data: string) => {
  const fixedVcard = fixFormatting(data)
  try {
    const card = vCard.parse(fixedVcard)
    return card.map((vcard) => vcard.toJSON())
  } catch (error) {
    throw new Error("The file could not be parsed.")
  }
}

const fixFormatting = (data: string) => {
  return data.replace(/\r?\n/g, "\r\n")
}

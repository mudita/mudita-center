/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactToImportAsFile } from "devices/common/models"
import { VCardParser, VCardVersion } from "app-utils/common"
import { mapVCard40Contact } from "./map-vcard-4-0-contact"
import { mapVCard30Contact } from "./map-vcard-3-0-contact"
import { mapVcard21Contact } from "./map-vcard-2-1-contact"

const mapCard = (
  card: string,
  version: VCardVersion
): ContactToImportAsFile[] => {
  if (version === VCardVersion.v21) {
    return new VCardParser(version)
      .parse(card)
      .map(mapVcard21Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  if (version === VCardVersion.v30) {
    return new VCardParser(version)
      .parse(card)
      .map(mapVCard30Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  if (version === VCardVersion.v40) {
    return new VCardParser(version)
      .parse(card)
      .map(mapVCard40Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  return []
}

export const mapVcardContacts = (data: string): ContactToImportAsFile[] => {
  // Every vCard carries its own VERSION, so a file holding entries of several
  // versions is read entry by entry rather than with the version the file
  // happens to open with. An entry that declares none falls back to it.
  const fileVersion = VCardParser.determineVersion(data)

  return VCardParser.splitCards(data).flatMap((card) => {
    // A card that declares a version this parser does not support is skipped
    // rather than read with another version's grammar. Only a card that
    // declares no version at all falls back to the one the file opened with.
    const version = VCardParser.declaresVersion(card)
      ? VCardParser.determineVersion(card)
      : fileVersion

    return version ? mapCard(card, version) : []
  })
}

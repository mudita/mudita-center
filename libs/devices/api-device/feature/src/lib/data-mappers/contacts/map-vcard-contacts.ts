/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactToImportAsFile } from "devices/common/models"
import { VCardParser, VCardVersion } from "app-utils/common"
import { mapVCard40Contact } from "./map-vcard-4-0-contact"
import { mapVCard30Contact } from "./map-vcard-3-0-contact"
import { mapVcard21Contact } from "./map-vcard-2-1-contact"

export const mapVcardContacts = (data: string): ContactToImportAsFile[] => {
  const version = VCardParser.determineVersion(data)
  if (!version) {
    return []
  }

  if (version === VCardVersion.v21) {
    const parser = new VCardParser(version)
    const contacts = parser.parse(data)

    return contacts
      .map(mapVcard21Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  if (version === VCardVersion.v30) {
    const parser = new VCardParser(version)
    const contacts = parser.parse(data)

    return contacts
      .map(mapVCard30Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  if (version === VCardVersion.v40) {
    const parser = new VCardParser(version)
    const contacts = parser.parse(data)
    return contacts
      .map(mapVCard40Contact)
      .filter(Boolean) as ContactToImportAsFile[]
  }

  return []
}

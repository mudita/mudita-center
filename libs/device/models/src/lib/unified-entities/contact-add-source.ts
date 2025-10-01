/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ContactAddSource {
  MCManual = "MC Manual", // created manually through MC
  MCImportGoogle = "MC Google Import", // imported manually through MC from Google
  MCImportOutlook = "MC Outlook Import", // imported manually through MC from Outlook
  MCImportCsv = "MC CSV Import", // imported manually through MC from CSV
  MCImportVCard = "MC vCard Import", // imported manually through MC from Vcard
  MigratedFromPure = "MC Pure Migration", // migrated from Pure
}

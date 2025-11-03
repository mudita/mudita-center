/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface PhoneNumber {
  id: string
  phoneNumber: string
  unifiedPhoneNumber?: string
  phoneType: "mobile" | "home" | "work" | "other" | "unknown"
}

interface EmailAddress {
  id: string
  emailAddress: string
  emailType: string
}

interface Address {
  streetAddress?: string
  secondStreetAddress?: string
  poBox?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  type: string
}

enum Source {
  MCManual = "MC Manual", // created manually through MC
  MCImportGoogle = "MC Google Import", // imported manually through MC from Google
  MCImportOutlook = "MC Outlook Import", // imported manually through MC from Outlook
  MCImportCsv = "MC CSV Import", // imported manually through MC from CSV
  MCImportVCard = "MC vCard Import", // imported manually through MC from Vcard
  MigratedFromPure = "MC Pure Migration", // migrated from Pure
}

export interface Contact {
  contactId: string
  firstName?: string
  lastName?: string
  namePrefix?: string
  middleName?: string
  nameSuffix?: string
  nickName?: string
  displayName1?: string
  displayName2?: string
  displayName3?: string
  displayName4?: string
  phoneNumbers?: PhoneNumber[]
  emailAddresses?: EmailAddress[]
  company?: string
  department?: string
  workTitle?: string
  sip?: string
  address?: Address
  website?: string
  notes?: string
  starred?: boolean
  entityType: string
  searchName: string
  sortField: string
  accountName: Source
}

export type ContactsNormalized = Record<Contact["contactId"], Contact>

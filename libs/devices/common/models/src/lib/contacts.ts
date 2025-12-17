/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum PhoneNumberType {
  Mobile = "mobile",
  Home = "home",
  Work = "work",
  Other = "other",
}

export interface PhoneNumber {
  id: string
  phoneNumber: string
  unifiedPhoneNumber?: string
  phoneType: PhoneNumberType
}

export enum EmailAddressType {
  Home = "home",
  Work = "work",
  Other = "other",
}

interface EmailAddress {
  id: string
  emailAddress: string
  emailType: EmailAddressType
}

export enum AddressType {
  Home = "home",
  Work = "work",
  Other = "other",
}

export enum UrlType {
  Home = "home",
  Work = "work",
  Other = "other",
}

interface Address {
  streetAddress?: string
  secondStreetAddress?: string
  poBox?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  type: AddressType
}

export enum ContactSource {
  // MCManual = "MC Manual", // created manually through MC
  MCImportGoogle = "MC Google Import", // imported manually through MC from Google
  MCImportOutlook = "MC Outlook Import", // imported manually through MC from Outlook
  MCImportCsv = "MC CSV Import", // imported manually through MC from CSV
  MCImportVCard = "MC vCard Import", // imported manually through MC from Vcard
  // MigratedFromPure = "MC Pure Migration", // migrated from Pure
}

export type ContactId = string

export interface Contact {
  contactId: ContactId
  firstName?: string
  lastName?: string
  namePrefix?: string
  middleName?: string
  nameSuffix?: string
  nickName?: string
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
  accountName: ContactSource
  entityType: string
  displayName1?: string
  displayName2?: string
  displayName3?: string
  displayName4?: string
  searchName: string
  sortField: string
}

export type ContactsNormalized = Record<Contact["contactId"], Contact>

export type ContactToImportAsEntity = Omit<
  Contact,
  | "contactId"
  | "displayName1"
  | "displayName2"
  | "displayName3"
  | "displayName4"
  | "searchName"
  | "sortField"
  | "phoneNumbers"
  | "emailAddresses"
> & {
  contactId?: ContactId
  phoneNumbers: Omit<PhoneNumber, "id" | "unifiedPhoneNumber">[]
  emailAddresses: Omit<EmailAddress, "id">[]
}

export type ContactToImportAsFile = {
  id?: string | number
  firstName?: string
  lastName?: string
  middleName?: string
  honorificPrefix?: string
  honorificSuffix?: string
  nickName?: string
  starred?: boolean
  phoneNumbers: {
    value: string
    type?: PhoneNumberType
    preference?: number
  }[]
  emailAddresses: {
    value: string
    type?: EmailAddressType
    preference?: number
  }[]
  addresses: {
    streetAddress?: string
    extendedAddress?: string
    poBox?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    countryCode?: string
    type?: AddressType
  }[]
  organizations: {
    name?: string
    title?: string
    department?: string
  }[]
  urls: {
    value: string
    type?: UrlType
    preference?: number
  }[]
  note?: string
  sip?: string
  importSource?: ContactSource
}

export interface DuplicateContactsGroup {
  toKeep: Contact
  toMerge: Contact[]
}
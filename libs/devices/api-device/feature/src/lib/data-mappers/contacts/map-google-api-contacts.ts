/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  AddressType,
  ContactSource,
  ContactToImportAsFile,
  EmailAddressType,
  PhoneNumberType,
  UrlType,
} from "devices/common/models"
import { GoogleContact } from "app-utils/models"

export const mapGoogleApiContacts = (
  contacts: GoogleContact[]
): ContactToImportAsFile[] => {
  return contacts.map((contact): ContactToImportAsFile => {
    const name =
      contact.names?.find((item) => item.metadata?.primary) ||
      contact.names?.[0]

    const nickname =
      contact.nicknames?.find((item) => item.metadata?.primary) ||
      contact.nicknames?.[0]

    const phoneNumbers =
      contact.phoneNumbers
        ?.filter((p) => p.value)
        .sort(sortByMetadataPrimary)
        .map((p) => {
          const type = p.type
            ? Object.values(PhoneNumberType).includes(
                p.type.toLowerCase() as PhoneNumberType
              )
              ? (p.type.toLowerCase() as PhoneNumberType)
              : PhoneNumberType.Other
            : PhoneNumberType.Other
          return {
            value: p.value as string,
            type,
            preference: p.metadata?.primary ? 1 : undefined,
          }
        }) || []

    const emailAddresses =
      contact.emailAddresses
        ?.filter((e) => e.value)
        .sort(sortByMetadataPrimary)
        .map((e) => {
          const type = e.type
            ? Object.values(EmailAddressType).includes(
                e.type.toLowerCase() as EmailAddressType
              )
              ? (e.type.toLowerCase() as EmailAddressType)
              : EmailAddressType.Other
            : EmailAddressType.Other
          return {
            value: e.value as string,
            type,
            preference: e.metadata?.primary ? 1 : undefined,
          }
        }) || []

    const addresses =
      contact.addresses
        ?.filter(
          (a) =>
            a.streetAddress ||
            a.extendedAddress ||
            a.poBox ||
            a.city ||
            a.region ||
            a.country ||
            a.postalCode
        )
        ?.sort(sortByMetadataPrimary)
        .map((a) => {
          const type = a.type
            ? Object.values(AddressType).includes(
                a.type.toLowerCase() as AddressType
              )
              ? (a.type.toLowerCase() as AddressType)
              : AddressType.Other
            : AddressType.Other
          return {
            streetAddress: a.streetAddress ?? undefined,
            extendedAddress: a.extendedAddress ?? undefined,
            poBox: a.poBox ?? undefined,
            city: a.city ?? undefined,
            region: a.region ?? undefined,
            country: a.country ?? undefined,
            postalCode: a.postalCode ?? undefined,
            type,
          }
        }) || []

    const organizations =
      contact.organizations
        ?.filter((o) => o.name || o.title || o.department)
        ?.sort(sortByMetadataPrimary)
        .map((o) => ({
          name: o.name ?? undefined,
          title: o.title ?? undefined,
          department: o.department ?? undefined,
        })) || []

    const urls =
      contact.urls
        ?.filter((u) => u.value)
        .sort(sortByMetadataPrimary)
        .map((u) => {
          const type = u.type
            ? Object.values(UrlType).includes(u.type.toLowerCase() as UrlType)
              ? (u.type.toLowerCase() as UrlType)
              : UrlType.Other
            : UrlType.Other
          return {
            value: u.value as string,
            type,
            preference: u.metadata?.primary ? 1 : undefined,
          }
        }) || []

    const note = (
      contact.biographies?.find((item) => item.metadata?.primary) ||
      contact.biographies?.[0]
    )?.value?.toString()

    const sip = (
      contact.sipAddresses?.find((item) => item.metadata?.primary) ||
      contact.sipAddresses?.[0]
    )?.value?.toString()

    return {
      firstName: name?.givenName ?? undefined,
      lastName: name?.familyName ?? undefined,
      middleName: name?.middleName ?? undefined,
      honorificPrefix: name?.honorificPrefix ?? undefined,
      honorificSuffix: name?.honorificSuffix ?? undefined,
      nickName: nickname?.value ?? undefined,
      phoneNumbers,
      emailAddresses,
      addresses,
      organizations,
      urls,
      note,
      sip,
      importSource: ContactSource.MCImportGoogle,
    }
  })
}

const sortByMetadataPrimary = <
  T extends { metadata?: { primary?: boolean | null } },
>(
  a: T,
  b: T
) => {
  const aPrimary = a.metadata?.primary ? 1 : 0
  const bPrimary = b.metadata?.primary ? 1 : 0
  return bPrimary - aPrimary
}

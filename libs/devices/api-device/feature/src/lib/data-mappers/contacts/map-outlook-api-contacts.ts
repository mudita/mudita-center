/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutlookContact } from "app-utils/models"
import {
  AddressType,
  ContactSource,
  ContactToImportAsFile,
  EmailAddressType,
  PhoneNumberType,
  UrlType,
} from "devices/common/models"

export const mapOutlookApiContacts = (
  contacts: OutlookContact[]
): ContactToImportAsFile[] => {
  return contacts.map((contact) => {
    const phoneNumbers =
      [
        {
          value: contact.mobilePhone,
          type: PhoneNumberType.Mobile,
        },
        ...(contact.homePhones?.map((phone) => ({
          value: phone,
          type: PhoneNumberType.Home,
        })) || []),
        ...(contact.businessPhones?.map((phone) => ({
          value: phone,
          type: PhoneNumberType.Work,
        })) || []),
      ]
        .filter((p) => p.value)
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
          }
        }) || []

    const emailAddresses =
      contact.emailAddresses
        ?.filter((e) => e.address)
        .map((e) => {
          const type = e.name
            ? Object.values(EmailAddressType).includes(
                e.name.toLowerCase() as EmailAddressType
              )
              ? (e.name.toLowerCase() as EmailAddressType)
              : EmailAddressType.Other
            : EmailAddressType.Other
          return {
            value: e.address as string,
            type,
          }
        }) || []

    const addresses =
      [
        { ...contact.homeAddress, type: AddressType.Home },
        { ...contact.businessAddress, type: AddressType.Work },
        { ...contact.otherAddress, type: AddressType.Other },
      ]
        .filter(
          (address) =>
            address.street ||
            address.city ||
            address.state ||
            address.countryOrRegion ||
            address.postalCode
        )
        .map((address) => ({
          streetAddress: address?.street ?? undefined,
          city: address?.city ?? undefined,
          region: address?.state ?? undefined,
          country: address?.countryOrRegion ?? undefined,
          postalCode: address?.postalCode ?? undefined,
          type: address.type,
        })) || []

    const organizations =
      [
        {
          company: contact.companyName ?? undefined,
          workTitle: contact.jobTitle ?? undefined,
          department: contact.department ?? undefined,
        },
      ].filter((o) => o.company || o.workTitle || o.department) || []

    const urls = contact.businessHomePage
      ? [
          {
            value: contact.businessHomePage ?? undefined,
            type: UrlType.Work,
            preference: 1,
          },
        ]
      : []

    return {
      firstName: contact.givenName ?? undefined,
      lastName: contact.surname ?? undefined,
      honorificPrefix: contact.title ?? undefined,
      honorificSuffix: contact.generation ?? undefined,
      middleName: contact.middleName ?? undefined,
      nickName: contact.nickName ?? undefined,
      phoneNumbers,
      emailAddresses,
      addresses,
      organizations,
      urls,
      note: contact.personalNotes ?? undefined,
      importSource: ContactSource.MCImportOutlook,
    }
  })
}

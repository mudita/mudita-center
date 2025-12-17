/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCard30 } from "app-utils/common"
import {
  AddressType,
  ContactSource,
  ContactToImportAsFile,
  EmailAddressType,
  PhoneNumberType,
  UrlType,
} from "devices/common/models"
import { intersection } from "lodash"
import logger from "electron-log"

export const mapVCard30Contact = (
  contact: VCard30
): ContactToImportAsFile | null => {
  try {
    const n = contact.N?.sort(sortByPref)[0].value
    const nickName = contact.NICKNAME?.sort(sortByPref)[0].value[0]
    const tel = contact.TEL?.sort(sortByPref)
    const email = contact.EMAIL?.sort(sortByPref)
    const adr = contact.ADR?.sort(sortByPref)
    const org = contact.ORG?.sort(sortByPref)
    const title = contact.TITLE?.sort(sortByPref)

    const phoneNumbers =
      tel
        ?.map((t) => {
          const type = [
            ...intersection(
              t.parameters.TYPE?.map((t) => t.toLowerCase()),
              Object.values(PhoneNumberType)
            ),
            PhoneNumberType.Other,
          ][0] as PhoneNumberType
          return {
            value: t.value.phoneNumber,
            type,
            preference: t.parameters.TYPE?.includes("pref") ? 1 : undefined,
          }
        })
        .filter((t) => t.value) || []

    const emailAddresses =
      email
        ?.map((e) => {
          const type = [
            ...intersection(
              e.parameters.TYPE?.map((t) => t.toLowerCase()),
              Object.values(EmailAddressType)
            ),
            EmailAddressType.Other,
          ][0] as EmailAddressType
          return {
            value: e.value,
            type,
            preference: e.parameters.TYPE?.includes("pref") ? 1 : undefined,
          }
        })
        .filter((e) => e.value) || []

    const addresses =
      adr
        ?.map((a) => {
          const type = [
            ...intersection(
              a.parameters.TYPE?.map((t) => t.toLowerCase()),
              Object.values(AddressType)
            ),
            AddressType.Other,
          ][0] as AddressType
          return {
            streetAddress: a.value.streetAddress,
            extendedAddress: a.value.secondStreetAddress,
            poBox: a.value.poBox,
            city: a.value.city,
            region: a.value.state,
            postalCode: a.value.zipCode,
            country: a.value.country,
            type,
          }
        })
        .filter((a) => {
          return (
            a.streetAddress ||
            a.extendedAddress ||
            a.poBox ||
            a.city ||
            a.region ||
            a.postalCode ||
            a.country
          )
        }) || []

    const organizations =
      org
        ?.map((o, index) => {
          return {
            name: o.value.name,
            department: o.value.unit,
            title: title?.[index]?.value,
          }
        })
        .filter((o) => o.name || o.department || o.title) || []

    const urls =
      contact.URL?.sort(sortByPref).map((u) => {
        const type = [
          ...intersection(
            u.parameters.TYPE?.map((t) => t.toLowerCase()),
            Object.values(UrlType)
          ),
          UrlType.Other,
        ][0] as UrlType
        return {
          value: u.value,
          type,
          preference: u.parameters.TYPE?.includes("pref") ? 1 : undefined,
        }
      }) || []

    const note = contact.NOTE?.sort(sortByPref)
      .map((n) => n.value)
      .join("\n")

    return {
      firstName: n?.firstName,
      lastName: n?.lastName,
      middleName: n?.middleName,
      honorificPrefix: n?.namePrefix,
      honorificSuffix: n?.nameSuffix,
      nickName,
      phoneNumbers,
      emailAddresses,
      addresses,
      organizations,
      urls,
      note,
      importSource: ContactSource.MCImportVCard,
    }
  } catch (error) {
    logger.error(`mapVcardContacts: failed to map vCard contact: ${error}`)
    return null
  }
}

const sortByPref = (
  a: { parameters: { TYPE?: string[] } },
  b: { parameters: { TYPE?: string[] } }
) => {
  const prefA = a.parameters.TYPE?.includes("pref") ? 1 : Infinity
  const prefB = b.parameters.TYPE?.includes("pref") ? 1 : Infinity
  return prefA - prefB
}

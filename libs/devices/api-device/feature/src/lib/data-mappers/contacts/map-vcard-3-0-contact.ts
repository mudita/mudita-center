/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCard30 } from "app-utils/common"
import { ContactSource, ContactToImportAsFile } from "devices/common/models"
import {
  mapAddressType,
  mapEmailAddressType,
  mapOrganizations,
  mapPhoneNumberType,
  mapUrlType,
} from "./map-vcard-common"
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
    const role = contact.ROLE?.sort(sortByPref)

    const phoneNumbers =
      tel
        ?.map((t) => {
          const type = mapPhoneNumberType(t.parameters.TYPE)
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
          const type = mapEmailAddressType(e.parameters.TYPE)
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
          const type = mapAddressType(a.parameters.TYPE)
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

    const organizations = mapOrganizations(org, title, role)

    const urls =
      contact.URL?.sort(sortByPref).map((u) => {
        const type = mapUrlType(u.parameters.TYPE)
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

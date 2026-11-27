/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { VCard40 } from "app-utils/common"
import { ContactSource, ContactToImportAsFile } from "devices/common/models"
import {
  mapAddressType,
  mapEmailAddressType,
  mapOrganizations,
  mapPhoneNumberType,
  mapUrlType,
} from "./map-vcard-common"
import logger from "electron-log"

export const mapVCard40Contact = (
  contact: VCard40
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
            preference: t.parameters.PREF?.[0],
          }
        })
        .filter((p) => p.value) || []

    const emailAddresses =
      email
        ?.map((e) => {
          const type = mapEmailAddressType(e.parameters.TYPE)
          return {
            value: e.value,
            type,
            preference: e.parameters.PREF?.[0],
          }
        })
        .filter((e) => e.value) || []

    const addresses =
      adr
        ?.map((a) => {
          const type = mapAddressType(a.parameters.TYPE)
          return {
            ...mapAddressComponents(a.value),
            poBox: a.value.poBox,
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
      contact.URL?.sort(sortByPref)
        .map((u) => {
          const type = mapUrlType(u.parameters.TYPE)
          return {
            value: u.value,
            type,
            preference: u.parameters.PREF?.[0],
          }
        })
        .filter((u) => u.value) || []

    const note = contact.NOTE?.sort(sortByPref)
      ?.map((n) => n.value)
      .join("\n")

    return {
      firstName: n?.firstName,
      lastName: withComponent(n?.lastName, n?.secondarySurname, " "),
      middleName: n?.middleName,
      honorificPrefix: n?.namePrefix,
      honorificSuffix: withComponent(n?.nameSuffix, n?.generation, ","),
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

type VCard40Address = NonNullable<VCard40["ADR"]>[number]["value"]

const joinComponents = (
  components: (string | undefined)[],
  separator: string
) => components.filter(Boolean).join(separator)

/**
 * RFC 9554 sec. 2.1 extends ADR with components that split apart what used to
 * be crammed into the street address. Producers should still write a combined
 * value into the street address component, but readers "SHOULD ignore the
 * street component during reads if the ADR property value contains any of the
 * new components" - so we rebuild it from the components instead.
 *
 * The RFC does not prescribe how to combine them back, so the parts are joined
 * in the order the specification defines them.
 */
const mapAddressComponents = (address: VCard40Address) => {
  const {
    room,
    apartment,
    floor,
    streetNumber,
    streetName,
    building,
    block,
    subdistrict,
    district,
    landmark,
    direction,
  } = address

  const hasRfc9554Components = [
    room,
    apartment,
    floor,
    streetNumber,
    streetName,
    building,
    block,
    subdistrict,
    district,
    landmark,
    direction,
  ].some(Boolean)

  if (!hasRfc9554Components) {
    return {
      streetAddress: address.streetAddress,
      extendedAddress: address.secondStreetAddress,
      city: address.city,
    }
  }

  // A landmark substitutes the street name and number, so it stands in only
  // when neither of them is given. RFC 9554 asks a reader to ignore the street
  // component, but only a component that actually describes the street can
  // replace it - a district or a cardinal direction alone must not wipe it.
  const street =
    joinComponents([streetNumber, streetName], " ") ||
    landmark ||
    address.streetAddress

  const streetComponents = [street, building, block, direction]
  // Only the legacy street component is superseded by RFC 9554. Preserve
  // the independent extended address and deduplicate whole component values.
  const extendedComponents = [
    ...new Set([address.secondStreetAddress, room, apartment, floor]),
  ]
  const localityComponents = [subdistrict, district]

  return {
    streetAddress: joinComponents(streetComponents, ", "),
    extendedAddress: joinComponents(extendedComponents, ", "),
    city: joinComponents([...localityComponents, address.city], ", "),
  }
}

const normaliseForComparison = (value: string) =>
  value.replace(/[\s,]+/g, " ").trim()

/**
 * RFC 9554 sec. 2.2 adds a secondary surname and a generation to N, and asks
 * producers to write such a value into both the new component and its
 * backwards compatible counterpart - the family name and the honorific
 * suffixes. A reader "SHOULD ignore any value in the backwards-compatible
 * component if an equal value is set in the new component", which with a
 * single field per name part means keeping the value exactly once.
 *
 * The counterpart holds a list, written with commas for the suffixes and with
 * spaces for a family name carrying two surnames, so both separators count
 * when looking for a value that is already there.
 */
const withComponent = (base = "", component = "", separator: string) => {
  if (!component) {
    return base
  }

  const alreadyPresent = ` ${normaliseForComparison(base)} `.includes(
    ` ${normaliseForComparison(component)} `
  )

  return alreadyPresent
    ? base
    : [base, component].filter(Boolean).join(separator)
}

const sortByPref = (
  a: { parameters: { PREF?: (number | undefined)[] } },
  b: { parameters: { PREF?: (number | undefined)[] } }
) => {
  const prefA = a.parameters.PREF?.[0] ?? Infinity
  const prefB = b.parameters.PREF?.[0] ?? Infinity
  return prefA - prefB
}

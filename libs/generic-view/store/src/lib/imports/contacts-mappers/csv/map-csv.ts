/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactAddSource, UnifiedContact } from "device/models"
import { getDisplayName } from "../helpers"
import { isEmpty } from "lodash"
import { ContactRow, Field } from "./parse.types"

export const mapCsv = (data: ContactRow[]): UnifiedContact[] => {
  const results = data
    .map((item, index) => {
      const contact: Omit<UnifiedContact, "displayName"> = {
        id: `${index}`,
        firstName: createField(item, ["First Name", "Given Name"]),
        middleName: createField(item, ["Middle Name", "Additional Name"]),
        lastName: createField(item, ["Last Name", "Family Name"]),
        honorificPrefix: createField(item, ["Title", "Name Prefix"]),
        honorificSuffix: createField(item, ["Suffix", "Name Suffix"]),
        phoneNumbers: [
          createContactField(
            item,
            ["Phone 1 - Type"],
            ["Primary Phone", "Phone 1 - Value"],
            1
          ),
          createContactField(item, ["Phone 2 - Type"], ["Phone 2 - Value"]),
          createContactField(item, ["Phone 3 - Type"], ["Phone 3 - Value"]),
          createContactField(item, ["Phone 4 - Type"], ["Phone 4 - Value"]),
          createContactField(item, "mobile", ["Mobile Phone"]),
          createContactField(item, "home", ["Home Phone"]),
          createContactField(item, "home", ["Home Phone 2"]),
          createContactField(item, "work", ["Business Phone"]),
          createContactField(item, "work", ["Business Phone 2"]),
          createContactField(item, "other", ["Other Phone"]),
          createContactField(item, "car", ["Car Phone"]),
          createContactField(item, "home fax", ["Home Fax"]),
          createContactField(item, "work fax", ["Business Fax"]),
          createContactField(item, "other fax", ["Other Fax"]),
          createContactField(item, "pager", ["Pager"]),
          createContactField(item, "isdn", ["ISDN"]),
          createContactField(item, "radio", ["Radio Phone"]),
          createContactField(item, "tty", ["TTY/TDD Phone"]),
          createContactField(item, "telex", ["Telex"]),
          createContactField(item, "callback", ["Callback"]),
        ].filter(Boolean) as UnifiedContact["phoneNumbers"],
        emailAddresses: [
          createContactField(
            item,
            ["E-mail 1 - Type"],
            ["E-mail Address", "E-mail 1 - Value"]
          ),
          createContactField(
            item,
            ["E-mail 2 - Type"],
            ["E-mail 2 Address", "E-mail 2 - Value"]
          ),
          createContactField(
            item,
            ["E-mail 3 - Type"],
            ["E-mail 3 Address", "E-mail 3 - Value"]
          ),
          createContactField(
            item,
            ["E-mail 4 - Type"],
            ["E-mail 4 Address", "E-mail 4 - Value"]
          ),
        ].filter(Boolean) as UnifiedContact["emailAddresses"],
        addresses: [
          createAddressField(
            item,
            "home",
            ["Home Street", "Home Street 2", "Home Street 3"],
            ["Home Address PO Box"],
            ["Home City"],
            ["Home State"],
            ["Home Postal Code"],
            ["Home Country"],
            ["Home Country"]
          ),
          createAddressField(
            item,
            "work",
            ["Business Street", "Business Street 2", "Business Street 3"],
            ["Business Address PO Box"],
            ["Business City"],
            ["Business State"],
            ["Business Postal Code"],
            ["Business Country"],
            ["Business Country"]
          ),
          createAddressField(
            item,
            "other",
            ["Other Street", "Other Street 2", "Other Street 3"],
            ["Other Address PO Box"],
            ["Other City"],
            ["Other State"],
            ["Other Postal Code"],
            ["Other Country"],
            ["Other Country"]
          ),
          createAddressField(
            item,
            ["Address 1 - Type"],
            ["Address 1 - Street"],
            ["Address 1 - PO Box"],
            ["Address 1 - City"],
            ["Address 1 - Region"],
            ["Address 1 - Postal Code"],
            ["Address 1 - Country"],
            ["Address 1 - Country"],
            ["Address 1 - Extended Address"]
          ),
          createAddressField(
            item,
            ["Address 2 - Type"],
            ["Address 2 - Street"],
            ["Address 2 - PO Box"],
            ["Address 2 - City"],
            ["Address 2 - Region"],
            ["Address 2 - Postal Code"],
            ["Address 2 - Country"],
            ["Address 2 - Country"],
            ["Address 2 - Extended Address"]
          ),
          createAddressField(
            item,
            ["Address 3 - Type"],
            ["Address 3 - Street"],
            ["Address 3 - PO Box"],
            ["Address 3 - City"],
            ["Address 3 - Region"],
            ["Address 3 - Postal Code"],
            ["Address 3 - Country"],
            ["Address 3 - Country"],
            ["Address 3 - Extended Address"]
          ),
        ].filter(Boolean) as UnifiedContact["addresses"],
        organizations: [
          createOrganizationField(
            item,
            ["Company", "Organization 1 - Name"],
            ["Job Title", "Organization 1 - Title"],
            ["Department", "Organization 1 - Department"]
          ),
          createOrganizationField(
            item,
            ["Organization 2 - Name"],
            ["Organization 2 - Title"],
            ["Organization 2 - Department"]
          ),
          createOrganizationField(
            item,
            ["Organization 3 - Name"],
            ["Organization 3 - Title"],
            ["Organization 3 - Department"]
          ),
        ].filter(Boolean) as UnifiedContact["organizations"],
        urls: [
          createContactField(
            item,
            ["Website 1 - Type"],
            ["Web Page", "Website 1 - Value"]
          ),
          createContactField(item, ["Website 2 - Type"], ["Website 2 - Value"]),
          createContactField(item, ["Website 3 - Type"], ["Website 3 - Value"]),
          createContactField(item, ["Website 4 - Type"], ["Website 4 - Value"]),
        ].filter(Boolean) as UnifiedContact["urls"],
        note: createField(item, ["Notes"]),
        nickname: createField(item, ["Nickname"]),
        importSource: ContactAddSource.MCImportCsv,
      }
      return {
        ...Object.entries(contact).reduce((acc, [key, value]) => {
          return value ? { ...acc, [key]: value } : acc
        }, {}),
        displayName: getDisplayName(contact),
      } as UnifiedContact
    })
    .filter(
      ({ id, displayName, ...item }) => !Object.values(item).every(isEmpty)
    )
  if (isEmpty(results)) {
    throw new Error("No contacts found")
  }
  return results
}

const createField = (item: ContactRow, fields: Field[]) => {
  for (const field of fields) {
    if (item[field]) return item[field]
  }
  return undefined
}

const createJoinedField = (item: ContactRow, fields: Field[]) => {
  return fields
    .map((field) => item[field])
    .filter(Boolean)
    .join(" ")
}

const createContactField = (
  item: ContactRow,
  typeFields: string | Field[],
  valueFields: Field[],
  preference?: number
) => {
  const value = createField(item, valueFields)
  const type =
    typeof typeFields === "string"
      ? typeFields
      : createField(item, typeFields)?.toLowerCase()
  return value
    ? {
        value,
        ...(type && { type }),
        ...(preference && { preference }),
      }
    : undefined
}

const createAddressField = (
  item: ContactRow,
  typeFields: string | Field[],
  streetFields: Field[],
  poBoxFields: Field[],
  cityFields: Field[],
  regionFields: Field[],
  postalCodeFields: Field[],
  countryFields: Field[],
  countryCodeFields: Field[],
  extendedAddressFields?: Field[]
) => {
  const type =
    typeof typeFields === "string"
      ? typeFields
      : createField(item, typeFields)?.toLowerCase()
  const streetAddress = createJoinedField(item, streetFields)
  const extendedAddress =
    extendedAddressFields && createField(item, extendedAddressFields)
  const poBox = createField(item, poBoxFields)
  const city = createField(item, cityFields)
  const region = createField(item, regionFields)
  const postalCode = createField(item, postalCodeFields)
  const country = createField(item, countryFields)
  const countryCode = createField(item, countryCodeFields)
  const address = {
    ...(streetAddress && { streetAddress }),
    ...(extendedAddress && { extendedAddress }),
    ...(poBox && { poBox }),
    ...(city && { city }),
    ...(region && { region }),
    ...(postalCode && { postalCode }),
    ...(country && { country }),
    ...(countryCode && { countryCode }),
  }
  if (Object.values(address).every(isEmpty)) {
    return undefined
  }
  return {
    type,
    ...address,
  }
}

const createOrganizationField = (
  item: ContactRow,
  nameFields: Field[],
  titleFields: Field[],
  departmentFields: Field[]
) => {
  const name = createField(item, nameFields)
  const title = createField(item, titleFields)
  const department = createField(item, departmentFields)
  const organization = {
    ...(name && { name }),
    ...(title && { title }),
    ...(department && { department }),
  }
  if (Object.values(organization).every(isEmpty)) {
    return undefined
  }
  return organization
}

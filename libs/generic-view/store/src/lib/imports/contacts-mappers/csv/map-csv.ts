/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UnifiedContact } from "device/models"
import { getDisplayName } from "../helpers"
import { isEmpty } from "lodash"
import { OutlookColumn } from "./outlook.types"
import { GoogleColumn } from "./google.types"

type Row = Record<OutlookColumn | GoogleColumn, string>

export const mapCsv = (data: unknown[]): UnifiedContact[] => {
  const getField = (
    row: Row,
    { outlook, google }: { outlook?: OutlookColumn; google?: GoogleColumn }
  ) => {
    return (outlook && row[outlook]) || (google && row[google])
  }

  return (data as Row[])
    .map((item, index) => {
      const partialResult: Omit<UnifiedContact, "displayName"> = {
        id: `${index}`,
        firstName: getField(item, {
          outlook: "First Name",
          google: "Given Name",
        }),
        middleName: getField(item, {
          outlook: "Middle Name",
          google: "Additional Name",
        }),
        lastName: getField(item, {
          outlook: "Last Name",
          google: "Family Name",
        }),
        honorificPrefix: getField(item, {
          outlook: "Title",
          google: "Name Prefix",
        }),
        honorificSuffix: getField(item, {
          outlook: "Suffix",
          google: "Name Suffix",
        }),
        phoneNumbers: (
          [
            {
              type: mapPhoneType(
                getField(item, {
                  google: "Phone 1 - Type",
                }) || "other"
              ),
              value: getField(item, {
                outlook: "Primary Phone",
                google: "Phone 1 - Value",
              }),
              preference: 1,
            },
            {
              type: mapPhoneType(
                getField(item, {
                  google: "Phone 2 - Type",
                }) || "other"
              ),
              value: getField(item, {
                google: "Phone 2 - Value",
              }),
            },
            {
              type: mapPhoneType(
                getField(item, {
                  google: "Phone 3 - Type",
                }) || "other"
              ),
              value: getField(item, {
                google: "Phone 3 - Value",
              }),
            },
            {
              type: mapPhoneType(
                getField(item, {
                  google: "Phone 4 - Type",
                }) || "other"
              ),
              value: getField(item, {
                google: "Phone 4 - Value",
              }),
            },
            {
              type: "mobile",
              value: getField(item, { outlook: "Mobile Phone" }),
            },
            { type: "home", value: getField(item, { outlook: "Home Phone" }) },
            {
              type: "home",
              value: getField(item, { outlook: "Home Phone 2" }),
            },
            {
              type: "work",
              value: getField(item, { outlook: "Business Phone" }),
            },
            {
              type: "work",
              value: getField(item, { outlook: "Business Phone 2" }),
            },
            {
              type: "other",
              value: getField(item, { outlook: "Other Phone" }),
            },
            { type: "other", value: getField(item, { outlook: "Car Phone" }) },
            { type: "home", value: getField(item, { outlook: "Home Fax" }) },
            {
              type: "other",
              value: getField(item, { outlook: "Business Fax" }),
            },
            { type: "other", value: getField(item, { outlook: "Other Fax" }) },
            { type: "other", value: getField(item, { outlook: "Pager" }) },
            { type: "other", value: getField(item, { outlook: "ISDN" }) },
            {
              type: "other",
              value: getField(item, { outlook: "Radio Phone" }),
            },
            {
              type: "other",
              value: getField(item, { outlook: "TTY/TDD Phone" }),
            },
            { type: "other", value: getField(item, { outlook: "Telex" }) },
            { type: "other", value: getField(item, { outlook: "Callback" }) },
          ] as const
        ).filter((item) => item.value) as UnifiedContact["phoneNumbers"],
        emailAddresses: [
          {
            value: getField(item, {
              outlook: "E-mail Address",
              google: "E-mail 1 - Value",
            }),
          },
          {
            value: getField(item, {
              outlook: "E-mail 2 Address",
              google: "E-mail 2 - Value",
            }),
          },
          {
            value: getField(item, {
              outlook: "E-mail 3 Address",
              google: "E-mail 3 - Value",
            }),
          },
          {
            value: getField(item, {
              google: "E-mail 4 - Value",
            }),
          },
        ].filter((item) => item.value) as UnifiedContact["emailAddresses"],
        addresses: [
          {
            type:
              mapAddressType(
                getField(item, {
                  google: "Address 1 - Type",
                })
              ) || "home",
            streetAddress: [
              getField(item, {
                outlook: "Home Street",
                google: "Address 1 - Street",
              }),
              getField(item, {
                outlook: "Home Street 2",
              }),
              getField(item, {
                outlook: "Home Street 3",
              }),
            ]
              .filter(Boolean)
              .join(" "),
            extendedAddress: getField(item, {
              google: "Address 1 - Extended Address",
            }),
            poBox: getField(item, {
              outlook: "Home Address PO Box",
              google: "Address 1 - PO Box",
            }),
            city: getField(item, {
              outlook: "Home City",
              google: "Address 1 - City",
            }),
            region: getField(item, {
              outlook: "Home State",
              google: "Address 1 - Region",
            }),
            postalCode: getField(item, {
              outlook: "Home Postal Code",
              google: "Address 1 - Postal Code",
            }),
            country: getField(item, {
              outlook: "Home Country",
              google: "Address 1 - Country",
            }),
          },
          {
            type:
              mapAddressType(
                getField(item, {
                  google: "Address 2 - Type",
                })
              ) || "work",
            streetAddress: [
              getField(item, {
                outlook: "Business Street",
                google: "Address 2 - Street",
              }),
              getField(item, {
                outlook: "Business Street 2",
              }),
              getField(item, {
                outlook: "Business Street 3",
              }),
            ]
              .filter(Boolean)
              .join(" "),
            extendedAddress: getField(item, {
              google: "Address 2 - Extended Address",
            }),
            poBox: getField(item, {
              outlook: "Business Address PO Box",
              google: "Address 2 - PO Box",
            }),
            city: getField(item, {
              outlook: "Business City",
              google: "Address 2 - City",
            }),
            region: getField(item, {
              outlook: "Business State",
              google: "Address 2 - Region",
            }),
            postalCode: getField(item, {
              outlook: "Business Postal Code",
              google: "Address 2 - Postal Code",
            }),
            country: getField(item, {
              outlook: "Business Country",
              google: "Address 2 - Country",
            }),
          },
          {
            type:
              mapAddressType(
                getField(item, {
                  google: "Address 3 - Type",
                })
              ) || "other",
            streetAddress: [
              getField(item, {
                outlook: "Other Street",
                google: "Address 3 - Street",
              }),
              getField(item, {
                outlook: "Other Street 2",
              }),
              getField(item, {
                outlook: "Other Street 3",
              }),
            ]
              .filter(Boolean)
              .join(" "),
            extendedAddress: getField(item, {
              google: "Address 3 - Extended Address",
            }),
            poBox: getField(item, {
              outlook: "Other Address PO Box",
              google: "Address 3 - PO Box",
            }),
            city: getField(item, {
              outlook: "Other City",
              google: "Address 3 - City",
            }),
            region: getField(item, {
              outlook: "Other State",
              google: "Address 3 - Region",
            }),
            postalCode: getField(item, {
              outlook: "Other Postal Code",
              google: "Address 3 - Postal Code",
            }),
            country: getField(item, {
              outlook: "Other Country",
              google: "Address 3 - Country",
            }),
          },
        ].filter(({ type, ...item }) => Object.values(item).some(Boolean)),
        organizations: [
          {
            name: getField(item, {
              outlook: "Company",
              google: "Organization 1 - Name",
            }),
            title: getField(item, {
              outlook: "Job Title",
              google: "Organization 1 - Title",
            }),
            department: getField(item, {
              outlook: "Department",
              google: "Organization 1 - Department",
            }),
          },
          {
            name: getField(item, {
              google: "Organization 2 - Name",
            }),
            title: getField(item, {
              google: "Organization 2 - Title",
            }),
            department: getField(item, {
              google: "Organization 2 - Department",
            }),
          },
          {
            name: getField(item, {
              google: "Organization 3 - Name",
            }),
            title: getField(item, {
              google: "Organization 3 - Title",
            }),
            department: getField(item, {
              google: "Organization 3 - Department",
            }),
          },
        ].filter((item) => Object.values(item).some(Boolean)),
        urls: [
          {
            value: getField(item, { outlook: "Web Page" }),
          },
        ].filter((item) => item.value) as UnifiedContact["urls"],
        note: getField(item, { outlook: "Notes", google: "Notes" }),
        nickname: getField(item, { google: "Nickname" }),
      } as const

      return {
        ...partialResult,
        displayName: getDisplayName(partialResult),
      }
    })
    .filter(
      ({ displayName, id, ...item }) => !Object.values(item).every(isEmpty)
    )
}

type PhoneType = "mobile" | "home" | "work" | "other"

export const mapPhoneType = (type?: string): PhoneType | undefined => {
  if (!type) return undefined
  return ["mobile", "home", "work", "other"].includes(type?.toLowerCase())
    ? (type?.toLowerCase() as PhoneType)
    : "other"
}

type AddressType = "home" | "work" | "other"

export const mapAddressType = (type?: string): AddressType | undefined => {
  if (!type) return undefined

  return ["home", "work", "other"].includes(type?.toLowerCase())
    ? (type?.toLowerCase() as AddressType)
    : "other"
}

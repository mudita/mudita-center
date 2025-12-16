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
} from "devices/common/models"
import { parseCsv } from "./parse-csv"
import { intersection } from "lodash"

export const mapCsvContacts = (csv: string): ContactToImportAsFile[] => {
  const data = parseCsv(csv)
  const normalizedColumnsNames = Object.keys(data[0]).map(normalize)

  return data.map((row): ContactToImportAsFile => {
    const getValue = (fieldNames: string[]) => {
      for (const fieldName of fieldNames) {
        const normalizedFieldName = normalize(fieldName)
        const index = normalizedColumnsNames.indexOf(normalizedFieldName)
        if (index !== -1) {
          const originalFieldName = Object.keys(row)[index]
          const value = row[originalFieldName]
          if (value && value.trim() !== "") {
            return value.trim()
          }
        }
      }
    }

    const firstName = getValue(["First Name", "Given Name", "Forename"])
    const lastName = getValue(["Last Name", "Family Name", "Surname"])
    const middleName = getValue(["Middle Name", "Additional Name"])
    const nickName = getValue(["Nickname", "Nick Name", "Nick"])
    const honorificPrefix = getValue([
      "Name Prefix",
      "Honorific Prefix",
      "Prefix",
    ])
    const honorificSuffix = getValue([
      "Name Suffix",
      "Honorific Suffix",
      "Suffix",
    ])

    const phoneNumbers = [
      {
        value: getValue([
          "Phone 1",
          "Phone 1 Value",
          "Primary Phone",
          "Phone Primary",
        ]),
        type: getValue(["Phone 1 Type", "Phone Primary Type"]),
      },
      {
        value: getValue([
          "Phone 2",
          "Phone 2 Value",
          "Secondary Phone",
          "Phone Secondary",
        ]),
        type: getValue(["Phone 2 Type", "Phone Secondary Type"]),
      },
      {
        value: getValue([
          "Phone 3",
          "Phone 3 Value",
          "Tertiary Phone",
          "Phone Tertiary",
        ]),
        type: getValue(["Phone 3 Type", "Phone Tertiary Type"]),
      },
      {
        value: getValue([
          "Phone 4",
          "Phone 4 Value",
          "Quaternary Phone",
          "Phone Quaternary",
        ]),
        type: getValue(["Phone 4 Type", "Phone Quaternary Type"]),
      },
      {
        value: getValue(["Phone", "Phone Value"]),
        type: getValue(["Phone Type"]),
      },
      {
        value: getValue([
          "Mobile",
          "Mobile Phone",
          "Mobile Number",
          "Cell",
          "Cell Phone",
          "Cell Number",
        ]),
        type: PhoneNumberType.Mobile,
      },
      {
        value: getValue(["Home Phone", "Phone Home"]),
        type: PhoneNumberType.Home,
      },
      {
        value: getValue(["Home Phone 2", "Phone Home 2"]),
        type: PhoneNumberType.Home,
      },
      {
        value: getValue([
          "Business Phone",
          "Work Phone",
          "Office Phone",
          "Phone Business",
          "Phone Work",
          "Phone Office",
        ]),
        type: PhoneNumberType.Work,
      },
      {
        value: getValue([
          "Business Phone 2",
          "Work Phone 2",
          "Office Phone 2",
          "Phone Business 2",
          "Phone Work 2",
          "Phone Office 2",
        ]),
        type: PhoneNumberType.Work,
      },
      {
        value: getValue([
          "Other Phone",
          "Additional Phone",
          "Phone Other",
          "Phone Additional",
        ]),
        type: PhoneNumberType.Other,
      },
      {
        value: getValue(["Car Phone", "Phone Car"]),
        type: PhoneNumberType.Other,
      },
    ]
      .filter((p) => p.value)
      .map((p) => ({
        ...p,
        type: [
          ...intersection(Object.values(PhoneNumberType), [
            p.type?.toUpperCase() || "",
          ]),
          PhoneNumberType.Other,
        ][0],
      })) as ContactToImportAsFile["phoneNumbers"]

    const emailAddresses = [
      {
        value: getValue([
          "Email",
          "Email 1",
          "Email 1 Value",
          "E-mail Address",
          "E-mail 1 Address",
          "E-mail Primary",
        ]),
        type: getValue([
          "Email Type",
          "Email Address Type",
          "E-mail 1 Type",
          "Email Primary Type",
        ]),
      },
      {
        value: getValue([
          "Email 2",
          "Email 2 Value",
          "E-mail 2 Address",
          "E-mail Secondary",
        ]),
        type: getValue([
          "Email 2 Type",
          "E-mail 2 Type",
          "Email Secondary Type",
        ]),
      },
      {
        value: getValue([
          "Email 3",
          "Email 3 Value",
          "E-mail 3 Address",
          "E-mail Tertiary",
        ]),
        type: getValue([
          "Email 3 Type",
          "E-mail 3 Type",
          "Email Tertiary Type",
        ]),
      },
      {
        value: getValue([
          "Email 4",
          "Email 4 Value",
          "E-mail 4 Address",
          "E-mail Quaternary",
        ]),
        type: getValue([
          "Email 4 Type",
          "E-mail 4 Type",
          "Email Quaternary Type",
        ]),
      },
    ]
      .filter((e) => e.value)
      .map((e) => ({
        ...e,
        type: [
          ...intersection(Object.values(EmailAddressType), [
            e.type?.toUpperCase() || "",
          ]),
          EmailAddressType.Other,
        ][0],
      })) as ContactToImportAsFile["emailAddresses"]

    const addresses = [
      {
        streetAddress: getValue(["Street"]),
        extendedAddress: getValue(["Street 2"]),
        poBox: getValue(["PO Box"]),
        city: getValue(["City", "Town"]),
        region: getValue(["State", "Province"]),
        postalCode: getValue(["Postal Code", "Zip"]),
        country: getValue(["Country"]),
        countryCode: getValue(["Country Code"]),
        type: getValue(["Type"]),
      },
      {
        streetAddress: getValue(["Home Street"]),
        extendedAddress: [
          getValue(["Home Street 2"]),
          getValue(["Home Street 3"]),
        ]
          .filter(Boolean)
          .join(", "),
        poBox: getValue(["Home Address PO Box", "Home PO Box"]),
        city: getValue(["Home City", "Home Town"]),
        region: getValue(["Home State", "Home Province"]),
        postalCode: getValue(["Home Postal Code", "Home Zip"]),
        country: getValue(["Home Country"]),
        countryCode: getValue(["Home Country Code"]),
        type: AddressType.Home,
      },
      {
        streetAddress: getValue([
          "Business Street",
          "Work Street",
          "Office Street",
        ]),
        extendedAddress: [
          getValue(["Business Street 2", "Work Street 2", "Office Street 2"]),
          getValue(["Business Street 3", "Work Street 3", "Office Street 3"]),
        ]
          .filter(Boolean)
          .join(", "),
        poBox: getValue([
          "Business Address PO Box",
          "Work PO Box",
          "Office PO Box",
        ]),
        city: getValue(["Business City", "Work City", "Office City"]),
        region: getValue([
          "Business State",
          "Work State",
          "Work Province",
          "Office State",
          "Office Province",
        ]),
        postalCode: getValue([
          "Business Postal Code",
          "Work Zip",
          "Office Postal Code",
          "Office Zip",
        ]),
        country: getValue([
          "Business Country",
          "Work Country",
          "Office Country",
        ]),
        countryCode: getValue([
          "Business Country Code",
          "Work Country Code",
          "Office Country Code",
        ]),
        type: AddressType.Work,
      },
      {
        streetAddress: getValue(["Other Street"]),
        extendedAddress: [
          getValue(["Other Street 2"]),
          getValue(["Other Street 3"]),
        ]
          .filter(Boolean)
          .join(", "),
        poBox: getValue(["Other Address PO Box", "Other PO Box"]),
        city: getValue(["Other City"]),
        region: getValue(["Other State", "Other Province"]),
        postalCode: getValue(["Other Postal Code", "Other Zip"]),
        country: getValue(["Other Country"]),
        countryCode: getValue(["Other Country Code"]),
        type: AddressType.Other,
      },
      {
        streetAddress: getValue(["Address Street", "Address 1 Street"]),
        extendedAddress: getValue(["Address Extended", "Address 1 Extended"]),
        poBox: getValue(["Address PO Box", "Address 1 PO Box"]),
        city: getValue([
          "Address city",
          "Address town",
          "Address 1 City",
          "Address 1 Town",
        ]),
        region: getValue([
          "Address State",
          "Address Province",
          "Address 1 State",
          "Address 1 Province",
        ]),
        postalCode: getValue([
          "Address Zip",
          "Address Postal Code",
          "Address 1 Zip",
          "Address 1 Postal Code",
        ]),
        country: getValue(["Address Country", "Address 1 Country"]),
        countryCode: getValue([
          "Address Country Code",
          "Address 1 Country Code",
        ]),
        type: getValue(["Address Type", "Address 1 Type"]),
      },
      {
        streetAddress: getValue(["Address 2 Street"]),
        extendedAddress: getValue(["Address 2 Extended"]),
        poBox: getValue(["Address 2 PO Box"]),
        city: getValue(["Address 2 City", "Address 2 Town"]),
        region: getValue(["Address 2 State", "Address 2 Province"]),
        postalCode: getValue(["Address 2 Zip", "Address 2 Postal Code"]),
        country: getValue(["Address 2 Country"]),
        countryCode: getValue(["Address 2 Country Code"]),
        type: getValue(["Address 2 Type"]),
      },
      {
        streetAddress: getValue(["Address 3 Street"]),
        extendedAddress: getValue(["Address 3 Extended"]),
        poBox: getValue(["Address 3 PO Box"]),
        city: getValue(["Address 3 City", "Address 3 Town"]),
        region: getValue(["Address 3 State", "Address 3 Province"]),
        postalCode: getValue(["Address 3 Zip", "Address 3 Postal Code"]),
        country: getValue(["Address 3 Country"]),
        countryCode: getValue(["Address 3 Country Code"]),
        type: getValue(["Address 3 Type"]),
      },
    ]
      .filter((address) => {
        return (
          address.streetAddress ||
          address.extendedAddress ||
          address.poBox ||
          address.city ||
          address.region ||
          address.postalCode ||
          address.country ||
          address.countryCode
        )
      })
      .map((address) => ({
        ...address,
        type: [
          ...intersection(Object.values(AddressType), [
            address.type?.toUpperCase() || "",
          ]),
          AddressType.Other,
        ][0],
      })) as ContactToImportAsFile["addresses"]

    const organizations = [
      {
        name: getValue([
          "Company",
          "Organization",
          "Organization Name",
          "Work Company",
        ]),
        title: getValue([
          "Job Title",
          "Title",
          "Work Title",
          "Position",
          "Work Position",
        ]),
        department: getValue([
          "Department",
          "Work Department",
          "Organization Department",
        ]),
      },
      {
        name: getValue(["Organization 2 Name"]),
        title: getValue(["Organization 2 Title"]),
        department: getValue(["Organization 2 Department"]),
      },
      {
        name: getValue(["Organization 3 Name"]),
        title: getValue(["Organization 3 Title"]),
        department: getValue(["Organization 3 Department"]),
      },
    ].filter((org) => org.name || org.title || org.department)

    const urls = [
      {
        value: getValue([
          "URL",
          "URL 1",
          "Website",
          "Website 1",
          "Website 1 Value",
          "Web Page",
          "Web Page 1",
        ]),
        type: getValue(["URL Type", "Website Type", "Website 1 Type"]),
      },
      {
        value: getValue([
          "Website 2",
          "Website 2 Value",
          "Web Page 2",
          "URL 2",
        ]),
        type: getValue(["Website 2 Type", "URL 2 Type"]),
      },
      {
        value: getValue([
          "Website 3",
          "Website 3 Value",
          "Web Page 3",
          "URL 3",
        ]),
        type: getValue(["Website 3 Type", "URL 3 Type"]),
      },
    ].filter((u) => u.value) as ContactToImportAsFile["urls"]

    const note = getValue(["Notes", "Note", "Comments"])
    const sip = getValue(["SIP Address", "SIP"])

    return {
      firstName,
      lastName,
      middleName,
      nickName,
      honorificPrefix,
      honorificSuffix,
      phoneNumbers,
      emailAddresses,
      addresses,
      organizations,
      urls,
      note,
      sip,
      importSource: ContactSource.MCImportCsv,
    }
  })
}

const normalize = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, "").trim().replace(/[_-]/g, "")
}

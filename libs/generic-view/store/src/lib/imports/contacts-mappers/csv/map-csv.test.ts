/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mapCsv } from "./map-csv"
import { GoogleColumn } from "./google.types"
import { OutlookColumn } from "./outlook.types"
import { ContactRow } from "./parse.types"

describe("mapCsv", () => {
  it("should map google data to unified contact", () => {
    const data: Record<GoogleColumn, string> = {
      "Given Name": "John",
      "Additional Name": "Adam",
      "Family Name": "Doe",
      "Name Prefix": "Dr.",
      "Name Suffix": "Sr.",
      Nickname: "Johnny",
      "Phone 1 - Type": "Home",
      "Phone 1 - Value": "123456789",
      "Phone 2 - Type": "Mobile",
      "Phone 2 - Value": "987654321",
      "Phone 3 - Type": "Work",
      "Phone 3 - Value": "987654321",
      "Phone 4 - Type": "Other",
      "Phone 4 - Value": "987654321",
      "E-mail 1 - Type": "Home",
      "E-mail 1 - Value": "john@doe.com",
      "E-mail 2 - Type": "Work",
      "E-mail 2 - Value": "john.doe@work.com",
      "E-mail 3 - Type": "Other",
      "E-mail 3 - Value": "john.doe@buziaczek.pl",
      "E-mail 4 - Type": "Work",
      "E-mail 4 - Value": "john@doe.xyz",
      "Address 1 - Type": "Home",
      "Address 1 - Formatted": "123 Main St Apt 1 New York, NY 10001",
      "Address 1 - Street": "123 Main St",
      "Address 1 - City": "New York",
      "Address 1 - Region": "NY",
      "Address 1 - Postal Code": "10001",
      "Address 1 - Country": "USA",
      "Address 1 - Extended Address": "Apt 1",
      "Address 1 - PO Box": "Home PO Box",
      "Address 2 - Type": "work",
      "Address 2 - Formatted": "456 Work St Apt 2 New Jersey, NJ 20002",
      "Address 2 - Street": "456 Work St",
      "Address 2 - City": "New Jersey",
      "Address 2 - Region": "NJ",
      "Address 2 - Postal Code": "20002",
      "Address 2 - Country": "USA",
      "Address 2 - Extended Address": "Apt 2",
      "Address 2 - PO Box": "Work PO Box",
      "Address 3 - Type": "other",
      "Address 3 - Formatted": "789 Other St Apt 3 New Jersey, NJ 30003",
      "Address 3 - Street": "789 Other St",
      "Address 3 - City": "New Jersey",
      "Address 3 - Region": "NJ",
      "Address 3 - Postal Code": "30003",
      "Address 3 - Country": "USA",
      "Address 3 - Extended Address": "Apt 3",
      "Address 3 - PO Box": "Other PO Box",
      "Organization 1 - Name": "Mudita",
      "Organization 1 - Title": "Developer",
      "Organization 1 - Department": "Center",
      "Organization 2 - Name": "Own Company",
      "Organization 2 - Title": "Engineer",
      "Organization 2 - Department": "other",
      "Organization 3 - Name": "Charity Company",
      "Organization 3 - Title": "Volunteer",
      "Organization 3 - Department": "1",
      "Website 1 - Type": "work",
      "Website 1 - Value": "https://mudita.com",
      "Website 2 - Type": "blog",
      "Website 2 - Value": "https://mudita.com/blog",
      "Website 3 - Type": "other",
      "Website 3 - Value": "https://other.xyx",
      "Website 4 - Type": "other",
      "Website 4 - Value": "https://other.com",
      Notes: "Some notes",
    }

    expect(mapCsv([data as ContactRow])).toEqual([
      {
        firstName: "John",
        id: "0",
        lastName: "Doe",
        middleName: "Adam",
        honorificPrefix: "Dr.",
        honorificSuffix: "Sr.",
        displayName: "John Adam Doe",
        nickname: "Johnny",
        phoneNumbers: [
          {
            preference: 1,
            type: "home",
            value: "123456789",
          },
          {
            type: "mobile",
            value: "987654321",
          },
          {
            type: "work",
            value: "987654321",
          },
          {
            type: "other",
            value: "987654321",
          },
        ],
        emailAddresses: [
          {
            type: "home",
            value: "john@doe.com",
          },
          {
            type: "work",
            value: "john.doe@work.com",
          },
          {
            type: "other",
            value: "john.doe@buziaczek.pl",
          },
          {
            type: "work",
            value: "john@doe.xyz",
          },
        ],
        addresses: [
          {
            city: "New York",
            country: "USA",
            countryCode: "USA",
            extendedAddress: "Apt 1",
            poBox: "Home PO Box",
            postalCode: "10001",
            region: "NY",
            streetAddress: "123 Main St",
            type: "home",
          },
          {
            city: "New Jersey",
            country: "USA",
            countryCode: "USA",
            extendedAddress: "Apt 2",
            poBox: "Work PO Box",
            postalCode: "20002",
            region: "NJ",
            streetAddress: "456 Work St",
            type: "work",
          },
          {
            city: "New Jersey",
            country: "USA",
            countryCode: "USA",
            extendedAddress: "Apt 3",
            poBox: "Other PO Box",
            postalCode: "30003",
            region: "NJ",
            streetAddress: "789 Other St",
            type: "other",
          },
        ],
        organizations: [
          {
            name: "Mudita",
            title: "Developer",
            department: "Center",
          },
          {
            name: "Own Company",
            title: "Engineer",
            department: "other",
          },
          {
            name: "Charity Company",
            title: "Volunteer",
            department: "1",
          },
        ],
        urls: [
          {
            type: "work",
            value: "https://mudita.com",
          },
          {
            type: "blog",
            value: "https://mudita.com/blog",
          },
          {
            type: "other",
            value: "https://other.xyx",
          },
          {
            type: "other",
            value: "https://other.com",
          },
        ],
        note: "Some notes",
      },
    ])
  })

  it("should map outlook data to unified contact", () => {
    const data: Record<OutlookColumn, string> = {
      "First Name": "John",
      "Middle Name": "Adam",
      "Last Name": "Doe",
      Title: "Dr.",
      Suffix: "Sr.",
      "Primary Phone": "123456789",
      "Home Phone": "123456789",
      "Home Phone 2": "234567890",
      "Mobile Phone": "987654321",
      "Business Phone": "987654321",
      "Business Phone 2": "876543210",
      "Other Phone": "987654321",
      Pager: "345678901",
      "Home Fax": "456789012",
      "Business Fax": "567890123",
      "Other Fax": "678901234",
      Callback: "789012345",
      "Car Phone": "890123456",
      ISDN: "901234567",
      "Radio Phone": "012345678",
      "TTY/TDD Phone": "123456789",
      Telex: "234567890",
      "E-mail Address": "john@doe.com",
      "E-mail 2 Address": "john.doe@work.com",
      "E-mail 3 Address": "john.doe@buziaczek.pl",
      "E-mail 4 Address": "john@doe.xyz",
      "Home Address": "123 Main St Apt 1/2 New York, NY 10001",
      "Home Street": "123 Main St",
      "Home City": "New York",
      "Home State": "NY",
      "Home Postal Code": "10001",
      "Home Country": "USA",
      "Home Street 2": "Apt 1",
      "Home Street 3": "2",
      "Home Address PO Box": "Home PO Box",
      "Business Address": "456 Work St 10/20 New Jersey, NJ 20002",
      "Business Street": "456 Work St",
      "Business City": "New Jersey",
      "Business State": "NJ",
      "Business Postal Code": "20002",
      "Business Country": "USA",
      "Business Street 2": "10",
      "Business Street 3": "20",
      "Business Address PO Box": "Business PO Box",
      "Other Address": "789 Other St 30/40 New Jersey, NJ 30003",
      "Other Street": "789 Other St",
      "Other City": "New Jersey",
      "Other State": "NJ",
      "Other Postal Code": "30003",
      "Other Country": "USA",
      "Other Street 2": "30",
      "Other Street 3": "40",
      "Other Address PO Box": "Other PO Box",
      Company: "Own Company",
      "Job Title": "Engineer",
      Department: "dep 1",
      "Web Page": "https://mudita.com",
      Notes: "Some notes",
    }

    expect(mapCsv([data as ContactRow])).toEqual([
      {
        firstName: "John",
        id: "0",
        lastName: "Doe",
        middleName: "Adam",
        honorificPrefix: "Dr.",
        honorificSuffix: "Sr.",
        displayName: "John Adam Doe",
        phoneNumbers: [
          {
            preference: 1,
            value: "123456789",
          },
          {
            type: "mobile",
            value: "987654321",
          },
          {
            type: "home",
            value: "123456789",
          },
          {
            type: "home",
            value: "234567890",
          },
          {
            type: "work",
            value: "987654321",
          },
          {
            type: "work",
            value: "876543210",
          },
          {
            type: "other",
            value: "987654321",
          },
          {
            type: "car",
            value: "890123456",
          },
          {
            type: "home fax",
            value: "456789012",
          },
          {
            type: "work fax",
            value: "567890123",
          },
          {
            type: "other fax",
            value: "678901234",
          },
          {
            type: "pager",
            value: "345678901",
          },
          {
            type: "isdn",
            value: "901234567",
          },
          {
            type: "radio",
            value: "012345678",
          },
          {
            type: "tty",
            value: "123456789",
          },
          {
            type: "telex",
            value: "234567890",
          },
          {
            type: "callback",
            value: "789012345",
          },
        ],
        emailAddresses: [
          {
            value: "john@doe.com",
          },
          {
            value: "john.doe@work.com",
          },
          {
            value: "john.doe@buziaczek.pl",
          },
          {
            value: "john@doe.xyz",
          },
        ],
        addresses: [
          {
            city: "New York",
            country: "USA",
            countryCode: "USA",
            postalCode: "10001",
            region: "NY",
            streetAddress: "123 Main St Apt 1 2",
            poBox: "Home PO Box",
            type: "home",
          },
          {
            city: "New Jersey",
            country: "USA",
            countryCode: "USA",
            postalCode: "20002",
            region: "NJ",
            streetAddress: "456 Work St 10 20",
            poBox: "Business PO Box",
            type: "work",
          },
          {
            city: "New Jersey",
            country: "USA",
            countryCode: "USA",
            poBox: "Other PO Box",
            postalCode: "30003",
            region: "NJ",
            streetAddress: "789 Other St 30 40",
            type: "other",
          },
        ],
        organizations: [
          {
            name: "Own Company",
            title: "Engineer",
            department: "dep 1",
          },
        ],
        urls: [
          {
            value: "https://mudita.com",
          },
        ],
        note: "Some notes",
      },
    ])
  })

  it("should omit empty contacts from google", () => {
    const data = [
      {
        "Given Name": "",
        "Additional Name": "",
        "Family Name": "",
        "Name Prefix": "",
        "Name Suffix": "",
        Nickname: "",
        "Phone 1 - Type": "Home",
        "Unknown field": "value",
      } as unknown as ContactRow,
    ]

    expect(mapCsv(data)).toEqual([])
  })

  it("should omit empty contacts from outlook", () => {
    const data = [
      {
        "First Name": "",
        "Middle Name": "",
        "Last Name": "",
        "Primary Phone": "",
        "Unknown field": "value",
      } as unknown as ContactRow,
    ]

    expect(mapCsv(data)).toEqual([])
  })
})

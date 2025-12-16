/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { parseCsv } from "./parse-csv"

describe("parseCsv", () => {
  it("should parse simple csv properly", () => {
    const csv = `first_name,last_name,email,phone
John,Doe,john@doe.com,123456789
Jane,Doe,jane@doe.com,234567890
Adam,Smith,adam@smith.com,345678901
`
    expect(parseCsv(csv)).toEqual([
      {
        email: "john@doe.com",
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
      },
      {
        email: "jane@doe.com",
        first_name: "Jane",
        last_name: "Doe",
        phone: "234567890",
      },
      {
        email: "adam@smith.com",
        first_name: "Adam",
        last_name: "Smith",
        phone: "345678901",
      },
    ])
  })

  it("should parse csv with empty lines properly", () => {
    const csv = `first_name,last_name,email,phone
John,Doe,john@doe.com,123456789

Jane,Doe,jane@doe.com,234567890

Adam,Smith,adam@smith.com,345678901
`
    expect(parseCsv(csv)).toEqual([
      {
        email: "john@doe.com",
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
      },
      {
        email: "jane@doe.com",
        first_name: "Jane",
        last_name: "Doe",
        phone: "234567890",
      },
      {
        email: "adam@smith.com",
        first_name: "Adam",
        last_name: "Smith",
        phone: "345678901",
      },
    ])
  })

  it("should parse csv with multiline value properly", () => {
    const csv = `first_name,last_name,email,phone,address
John,Doe,john@doe.com,123456789,"123 Main St
Apt 1 New York,
NY 10001"
Jane,Doe,jane@doe.com,234567890,"234 Main St Apt 2 New York, NY 10001"
Adam,Smith,adam@smith.com,345678901,"345 Main St Apt 3 New York, NY 10001"
`
    expect(parseCsv(csv)).toEqual([
      {
        address: "123 Main St Apt 1 New York, NY 10001",
        email: "john@doe.com",
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
      },
      {
        address: "234 Main St Apt 2 New York, NY 10001",
        email: "jane@doe.com",
        first_name: "Jane",
        last_name: "Doe",
        phone: "234567890",
      },
      {
        address: "345 Main St Apt 3 New York, NY 10001",
        email: "adam@smith.com",
        first_name: "Adam",
        last_name: "Smith",
        phone: "345678901",
      },
    ])
  })

  it("should parse csv properly when TooFewFields error occurred", () => {
    const csv = `first_name,last_name,email,phone,address
Jane,Doe,jane@doe.com,234567890
`
    expect(parseCsv(csv)).toEqual([
      {
        email: "jane@doe.com",
        first_name: "Jane",
        last_name: "Doe",
        phone: "234567890",
      },
    ])
  })

  it("should parse csv properly when TooManyFields error occurred", () => {
    const csv = `first_name,last_name,email,phone,address
Jane,Doe,jane@doe.com,234567890,"123 Main St Apt 1 New York, NY 10001",extra
`
    expect(parseCsv(csv)).toEqual([
      {
        __parsed_extra: ["extra"],
        address: "123 Main St Apt 1 New York, NY 10001",
        email: "jane@doe.com",
        first_name: "Jane",
        last_name: "Doe",
        phone: "234567890",
      },
    ])
  })
})

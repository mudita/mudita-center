/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  MigrationService,
  Migrations,
} from "./migration-service"

describe("MigrationService", () => {
  it("properly sorts migrations", () => {
    const migrations = {
      "4.0.2": jest.fn(),
      "4.0.3": jest.fn(),
      "4.0.1": jest.fn(),
    }

    const service = new MigrationService(
      migrations,
      {
        key: "value",
      },
      "4.0.0",
      "4.0.3"
    )

    // @ts-expect-error Accessing private property for testing
    expect(service.migrations).toEqual([
      migrations["4.0.1"],
      migrations["4.0.2"],
      migrations["4.0.3"],
    ])
  })

  it("properly filters migrations", () => {
    const migrations = {
      "4.0.0": jest.fn(),
      "4.0.1": jest.fn(),
      "4.0.2": jest.fn(),
      "4.0.3": jest.fn(),
      "4.0.4": jest.fn(),
    }

    const service = new MigrationService(
      migrations,
      {
        key: "value",
      },
      "4.0.0",
      "4.0.3"
    )

    // @ts-expect-error Accessing private property for testing
    expect(service.migrations).toEqual([
      migrations["4.0.1"],
      migrations["4.0.2"],
      migrations["4.0.3"],
    ])
  })

  it("properly executes migrations", () => {
    const migrations: Migrations = {
      "4.0.1": (data) => {
        return {
          ...data,
          version: "4.0.1",
        }
      },
      "4.0.2": (data) => {
        return {
          ...data,
          version: "4.0.2",
          newField: "newValue",
          anotherField: "anotherValue",
        }
      },
      "4.0.3": (data) => {
        const newData = { ...data }
        delete newData.newField
        return {
          ...newData,
          version: "4.0.3",
          someField: "someValue",
        }
      },
    }

    const service = new MigrationService(
      migrations,
      {
        version: "4.0.0",
        key: "value",
      },
      "4.0.0",
      "4.0.3"
    )

    const result = service.migrate()

    expect(result).toEqual({
      version: "4.0.3",
      key: "value",
      anotherField: "anotherValue",
      someField: "someValue",
    })
  })
})

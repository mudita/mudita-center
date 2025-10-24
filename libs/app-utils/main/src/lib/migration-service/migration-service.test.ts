/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MigrationService } from "./migration-service"

describe("MigrationService", () => {
  it("properly performs all migrations when no _metadata is available", () => {
    const migrations = {
      "4.0.0": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.0",
          foo: "bar",
        }
      }),
      "4.0.1": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.1",
          bar: "baz",
        }
      }),
      "4.0.2": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.2",
          foo: "baz",
        }
      }),
    }
    const service = new MigrationService(migrations, {
      key: "value",
    })

    const migratedData = service.migrate()

    expect(migrations["4.0.0"]).toHaveBeenCalledTimes(1)
    expect(migrations["4.0.1"]).toHaveBeenCalledTimes(1)
    expect(migrations["4.0.2"]).toHaveBeenCalledTimes(1)

    expect(migratedData).toEqual({
      key: "value",
      version: "4.0.2",
      foo: "baz",
      bar: "baz",
      _metadata: { lastMigratedVersion: "4.0.2" },
    })
  })

  it("properly performs all migrations when _metadata.lastMigratedVersion is null", () => {
    const migrations = {
      "4.0.0": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.0",
          foo: "bar",
        }
      }),
      "4.0.1": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.1",
          bar: "baz",
        }
      }),
      "4.0.2": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.2",
          foo: "baz",
        }
      }),
    }
    const service = new MigrationService(migrations, {
      key: "value",
      _metadata: { lastMigratedVersion: null },
    })

    const migratedData = service.migrate()

    expect(migrations["4.0.0"]).toHaveBeenCalledTimes(1)
    expect(migrations["4.0.1"]).toHaveBeenCalledTimes(1)
    expect(migrations["4.0.2"]).toHaveBeenCalledTimes(1)

    expect(migratedData).toEqual({
      key: "value",
      version: "4.0.2",
      foo: "baz",
      bar: "baz",
      _metadata: { lastMigratedVersion: "4.0.2" },
    })
  })

  it("properly performs no migrations when _metadata.lastMigratedVersion is up to date", () => {
    const migrations = {
      "4.0.0": jest.fn(),
      "4.0.1": jest.fn(),
      "4.0.2": jest.fn(),
    }
    const service = new MigrationService(migrations, {
      key: "value",
      _metadata: { lastMigratedVersion: "4.0.2" },
    })
    const migratedData = service.migrate()

    expect(migrations["4.0.0"]).not.toHaveBeenCalled()
    expect(migrations["4.0.1"]).not.toHaveBeenCalled()
    expect(migrations["4.0.2"]).not.toHaveBeenCalled()

    expect(migratedData).toEqual({
      key: "value",
      _metadata: { lastMigratedVersion: "4.0.2" },
    })
  })

  it("properly performs some migrations when _metadata.lastMigratedVersion is not up to date", () => {
    const migrations = {
      "4.0.0": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.0",
          foo: "bar",
        }
      }),
      "4.0.1": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.1",
          bar: "baz",
        }
      }),
      "4.0.2": jest.fn().mockImplementation((data) => {
        return {
          ...data,
          version: "4.0.2",
          baz: "foo",
        }
      }),
    }
    const service = new MigrationService(migrations, {
      key: "value",
      _metadata: { lastMigratedVersion: "4.0.0" },
    })
    const migratedData = service.migrate()

    expect(migrations["4.0.0"]).not.toHaveBeenCalled()
    expect(migrations["4.0.1"]).toHaveBeenCalledTimes(1)
    expect(migrations["4.0.2"]).toHaveBeenCalledTimes(1)

    expect(migratedData).toEqual({
      key: "value",
      version: "4.0.2",
      bar: "baz",
      baz: "foo",
      _metadata: { lastMigratedVersion: "4.0.2" },
    })
  })
})

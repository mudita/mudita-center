/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PreBackup,
  PreBackupValidator200,
  PreBackupValidator202,
} from "./backup"

const minimumPreBackupConfig200: PreBackup = {
  backupId: 123,
  features: { contacts: "dummy-string", messages: "dummy-string" },
}

describe("PreBackupValidator200", () => {
  it("should return success when correct config is validated", () => {
    const preBackup = { ...minimumPreBackupConfig200 }
    const result = PreBackupValidator200(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const preBackup = {}
    const result = PreBackupValidator200([]).safeParse(preBackup)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when feature is missing", () => {
    const preBackup: PreBackup = {
      ...minimumPreBackupConfig200,
      features: { contacts: "dummy-string" },
    }

    const result = PreBackupValidator200(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeFalsy()
  })
})

const minimumPreBackupConfig202: PreBackup = {
  backupId: 123,
}

describe("PreBackupValidator202", () => {
  it("should return success when correct config is validated", () => {
    const preBackup = { ...minimumPreBackupConfig202 }
    const result = PreBackupValidator202([]).safeParse(preBackup)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const preBackup = {}
    const result = PreBackupValidator202([]).safeParse(preBackup)
    expect(result.success).toBeFalsy()
  })
  it("should return success when correct features are passed", () => {
    const preBackup: PreBackup = {
      ...minimumPreBackupConfig202,
      features: { contacts: "dummy-string", messages: "dummy-string" },
    }

    const result = PreBackupValidator202(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeTruthy()
  })
  it("should return fail when feature is missing", () => {
    const preBackup: PreBackup = {
      ...minimumPreBackupConfig202,
      features: { contacts: "dummy-string" },
    }

    const result = PreBackupValidator202(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeFalsy()
  })
})

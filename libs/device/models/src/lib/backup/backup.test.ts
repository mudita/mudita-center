/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PreBackup, PreBackupValidator } from "./backup"

const minimumPreBackupConfig: PreBackup = {
  backupId: 123,
}

describe("PreBackupValidator", () => {
  it("should return success when correct config is validated", () => {
    const preBackup = { ...minimumPreBackupConfig }
    const result = PreBackupValidator([]).safeParse(preBackup)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const preBackup = {}
    const result = PreBackupValidator([]).safeParse(preBackup)
    expect(result.success).toBeFalsy()
  })
  it("should return success when correct features are passed", () => {
    const preBackup: PreBackup = {
      ...minimumPreBackupConfig,
      features: { contacts: "dummy-string", messages: "dummy-string" },
    }

    const result = PreBackupValidator(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeTruthy()
  })
  it("should return fail when feature is missing", () => {
    const preBackup: PreBackup = {
      ...minimumPreBackupConfig,
      features: { contacts: "dummy-string" },
    }

    const result = PreBackupValidator(["contacts", "messages"]).safeParse(
      preBackup
    )
    expect(result.success).toBeFalsy()
  })
})

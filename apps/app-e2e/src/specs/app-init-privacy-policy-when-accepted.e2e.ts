/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SPEC_TITLE } from "../consts/spec-title"
import { E2EMockClient } from "e2e-mock/client"

describe(SPEC_TITLE.APP_INIT_PRIVACY_POLICY_WHEN_ACCEPTED, () => {
  before(async () => {
    console.log("Starting E2E Mock Client for app-init-privacy-policy-when-accepted")
    await E2EMockClient.connect()
    void E2EMockClient.write({
      data: JSON.stringify({
        version: "9.0.0",
        user: {
          privacyPolicyAccepted: true,
          backupLocation:
            "/Users/mudita/Library/Application Support/@mudita/mudita-center-app/backups",
        },
        system: {
          analyticsId: "eb9f1a9f1eb9f6e9",
          restartRequiredForSerialPortAccess: false,
        },
      }),
      scopeRelativePath: "app-settings.json",
      scope: "userData",
    })

    const result = await E2EMockClient.read({
      scopeRelativePath: "app-settings.json",
      scope: "userData",
    })

    const buf = Buffer.from(result.data.data)
    const jsonText = buf.toString("utf8")
    const obj = JSON.parse(jsonText)
    console.log("App settings:", obj)
    await browser.pause(1000000)
  })

  it("should display all core modal elements", async () => {})

  it("should display action controls", async () => {})
})

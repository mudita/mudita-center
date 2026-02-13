/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import random from "lodash/random"
import {
  buildPostBackupRequest,
  buildPreBackupGetRequest,
  buildPreBackupPostRequest,
  PreBackupResponse200,
  PreBackupResponseValidator200,
  PreBackupResponseValidator202,
} from "devices/api-device/models"
import { delay } from "app-utils/common"
import { withBodyStatus } from "./helpers/with-body-status"
import {
  ApiDeviceTestService,
  getService,
} from "./helpers/api-device-test-service"

let backupFeatures: string[]

describe("Backup feature", () => {
  beforeEach(async () => {
    await fetchSupportedFeatures()
  }, 60_000)

  it("should prepare valid backup files for all features", async () => {
    await performFullBackup(backupFeatures)
  }, 60_000)

  it("should prepare valid backup file for every single feature", async () => {
    for (const feature of backupFeatures) {
      await performFullBackup([feature])
    }
  }, 60_000)

  it.skip("should return an error for startPreBackup for unknown features.", async () => {
    const result = await getService().request(
      buildPreBackupPostRequest({
        features: ["dummyFeature", "dummyFeature2"],
        backupId: random(1, 100000),
      })
    )

    // TODO: fix error handling on device side
    // expect(result.error).toBeTruthy()
    // At the moment device returns 200 with empty features object
    //  {
    //    endpoint: 'PRE_BACKUP',
    //    status: 200,
    //    rid: 1,
    //    body: { backupId: 70063, features: {}, progress: 100 }
    //  }
  })

  it("should prepare valid backup if features contains known feature.", async () => {
    const result = await getService().request(
      buildPreBackupPostRequest({
        features: ["CONTACTS_V1", "dummyFeature", "dummyFeature2"],
        backupId: random(1, 100000),
      })
    )
    expect(result.status).toBe(202)
  }, 60_000)

  it.skip("should return an error for checkPreBackup with an invalid backupId.", async () => {
    const result = await getService().request(
      buildPreBackupGetRequest({
        backupId: -1,
      })
    )

    // TODO: fix error handling on device side
    // expect(result.error).toBeTruthy()
    // At the moment device returns 200 with empty features object
    //  {
    //    endpoint: 'PRE_BACKUP',
    //    status: 200,
    //    rid: 1,
    //    body: { backupId: 70063, features: {}, progress: 100 }
    //  }
  })

  async function fetchSupportedFeatures() {
    backupFeatures = [
      "CONTACTS_V1",
      "CALL_LOGS_V1",
      "MESSAGES_V1",
      "ALARMS_V1",
      "NOTES_V1",
    ]
  }

  const performFullBackup = async (featuresArray: string[]): Promise<void> => {
    const backupId = random(1, 100000)
    const preBackupStartResult = await getService().request(
      buildPreBackupPostRequest({
        features: featuresArray,
        backupId,
      })
    )

    expect([200, 202]).toContain(preBackupStartResult.status)

    const enriched = withBodyStatus(preBackupStartResult)

    const preBackupStartData =
      preBackupStartResult.status === 202
        ? PreBackupResponseValidator202.parse(enriched.body)
        : PreBackupResponseValidator200.parse(enriched.body)

    const features = await awaitPreBackupReady({
      service: getService(),
      backupId: preBackupStartData.backupId,
    })

    expect([...Object.keys(features)].sort()).toEqual([...featuresArray].sort())

    expect(
      Object.values(features).every(
        (value) => value !== undefined && value !== null && value !== ""
      )
    ).toBeTruthy()

    const postBackupResult = await getService().request(
      buildPostBackupRequest({ backupId: preBackupStartData.backupId })
    )

    expect(postBackupResult.status).toBe(200)
  }
})

type AwaitPreBackupReadyParams = {
  service: ApiDeviceTestService
  backupId: number

  delayMs?: number
  maxAttempts?: number
  attempt?: number
}

const awaitPreBackupReady = async ({
  service,
  backupId,
  delayMs = 1000,
  maxAttempts = 60,
  attempt = 1,
}: AwaitPreBackupReadyParams): Promise<PreBackupResponse200["features"]> => {
  const res = await getService().request(buildPreBackupGetRequest({ backupId }))

  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`PRE_BACKUP polling failed (status: ${res.status})`)
  }

  const enriched = withBodyStatus(res)

  if (res.status === 202) {
    PreBackupResponseValidator202.parse(enriched.body)

    if (attempt >= maxAttempts) {
      throw new Error(`PRE_BACKUP not ready after ${maxAttempts} attempts`)
    }

    await delay(delayMs)
    return awaitPreBackupReady({
      service,
      backupId,
      delayMs,
      maxAttempts,
      attempt: attempt + 1,
    })
  }

  const data = PreBackupResponseValidator200.parse(enriched.body)
  return data.features
}

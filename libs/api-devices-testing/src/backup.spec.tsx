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
import { AppSerialPortService } from "app-serialport/main"
import { withBodyStatus } from "./helpers/with-body-status"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"

let apiDeviceContext: ApiDeviceContext
let backupFeatures: string[]

describe("Backup feature", () => {
  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
    await fetchSupportedFeatures()
  }, 10_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 10_000)

  it("should prepare valid backup files for all features", async () => {
    await performFullBackup(backupFeatures)
  }, 30000)

  it("should prepare valid backup file for every single feature", async () => {
    for (const feature of backupFeatures) {
      await performFullBackup([feature])
    }
  }, 30000)

  it.skip("should return an error for startPreBackup for unknown features.", async () => {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
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
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
      buildPreBackupPostRequest({
        features: ["CONTACTS_V1", "dummyFeature", "dummyFeature2"],
        backupId: random(1, 100000),
      })
    )
    expect(result.status).toBe(202)
  })

  it.skip("should return an error for checkPreBackup with an invalid backupId.", async () => {
    const { service, deviceId } = apiDeviceContext
    const result = await service.request(
      deviceId,
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

  async function performFullBackup(featuresArray: string[]): Promise<void> {
    const { service, deviceId } = apiDeviceContext
    const backupId = random(1, 100000)
    const preBackupStartResult = await service.request(
      deviceId,
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
      service,
      deviceId: deviceId,
      backupId: preBackupStartData.backupId,
    })

    expect([...Object.keys(features)].sort()).toEqual([...featuresArray].sort())

    expect(
      Object.values(features).every(
        (value) => value !== undefined && value !== null && value !== ""
      )
    ).toBeTruthy()

    const postBackupResult = await service.request(
      deviceId,
      buildPostBackupRequest({ backupId: preBackupStartData.backupId })
    )

    expect(postBackupResult.status).toBe(200)
  }
})

type AwaitPreBackupReadyParams = {
  service: AppSerialPortService
  deviceId: string
  backupId: number

  delayMs?: number
  maxAttempts?: number
  attempt?: number
}

async function awaitPreBackupReady({
  service,
  deviceId,
  backupId,
  delayMs = 1000,
  maxAttempts = 60,
  attempt = 1,
}: AwaitPreBackupReadyParams): Promise<PreBackupResponse200["features"]> {
  const res = await service.request(
    deviceId,
    buildPreBackupGetRequest({ backupId })
  )

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
      deviceId,
      backupId,
      delayMs,
      maxAttempts,
      attempt: attempt + 1,
    })
  }

  const data = PreBackupResponseValidator200.parse(enriched.body)
  return data.features
}

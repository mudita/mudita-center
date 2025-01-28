/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { APIBackupService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"
import { delay } from "shared/utils"

jest.mock("shared/utils", () => {
  return { 
    callRenderer: () => {},
    delay: () => { return new Promise((resolve) => setTimeout(resolve, 500))}  }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => { } }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => { },
    },
  }
})

describe("Backup feature", () => {
  let deviceProtocol: DeviceProtocol
  let backupFeatures: string[]

  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    await fetchSupportedFeatures()
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should prepare valid backup files for all features", async () => {
    const apiBackupService = new APIBackupService(deviceProtocol)
    await validateBackupFeatures(apiBackupService, backupFeatures)
  }, 30000)

  it("should prepare valid backup file for every single feature", async () => {
    const apiBackupService = new APIBackupService(deviceProtocol)
    for (const feature of backupFeatures) {
      await validateBackupFeatures(apiBackupService, [feature])
    }
  }, 30000)

  //TODO result.ok should be falsy if backupId is invalid
  xit("should return error for invalid backupId", async () => {
    const apiConfigService = new APIBackupService(deviceProtocol)
    const result = await apiConfigService.postBackup({ backupId: -1 })
    expect(result.ok).toBeFalsy()
  })

  async function fetchSupportedFeatures() {
    backupFeatures = ["CONTACTS_V1", "CALL_LOGS_V1", "MESSAGES_V1", "ALARMS_V1", "NOTES_V1"]
  }

  async function validateBackupFeatures(
    apiBackupService: APIBackupService,
    featuresArray: string[],
  ): Promise<void> {
    let features: Record<string, string> | undefined = undefined
    const preBackupResult = await apiBackupService.startPreBackup({ features: featuresArray })

    expect(preBackupResult.ok).toBeTruthy()

    if (preBackupResult.ok) {
      while (features === undefined) {
        const checkPreBackupResponse = await apiBackupService.checkPreBackup({
          backupId: preBackupResult.data.backupId,
          features: featuresArray,
        })
        if (checkPreBackupResponse.ok && checkPreBackupResponse.data.features !== undefined) {
          features = checkPreBackupResponse.data.features
        }
        await delay(1000)
      }

      expect(Object.keys(features).sort()).toEqual(featuresArray.sort())
      expect(
        Object.values(features).every(value => value !== undefined && value !== null && value !== '')
      ).toBeTruthy()

      const postBackupResult = await apiBackupService.postBackup({ backupId: preBackupResult.data.backupId })

      expect(postBackupResult).toBeTruthy()
    }
  }
})

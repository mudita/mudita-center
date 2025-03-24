/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { setActiveDevice } from "./helpers/protocol-validator"
import { GetAppInstallationProgress, StartAppInstallation } from "device/models"
import { AppInstallationService } from "Libs/device/feature/src/lib/file-manager/app-installation.service"
import { delay } from "shared/utils"
import * as path from "path"
import { exec } from "child_process"
import util from "util"
export const execPromise = util.promisify(exec)

jest.mock("shared/utils", () => {
  return {
    callRenderer: () => {},
    delay: () => {
      return new Promise((resolve) => setTimeout(resolve, 500))
    },
  }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

let deviceProtocol: DeviceProtocol
let deviceId: string | undefined
const testFilesDir = "test-files"
const appPath = "/storage/emulated/0/Applications"
const validApkName = "valid.apk"
const incompatibleApkName = "invalid.apk"

describe("App install", () => {
  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    deviceId = deviceProtocol.activeDevice?.id
    await deviceProtocol.activeDevice?.disconnect()
    const localPath = path.join(__dirname, testFilesDir)
    try {
      const command = `adb push ${localPath} ${appPath}/`
      await execPromise(command)
    } catch (err) {
      console.log(err)
    }
  }, 20000)

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  afterAll(async () => {
    try {
      const command = `adb shell rm -r /storage/emulated/0/Applications/${testFilesDir}`
      await execPromise(command)
    } catch (err) {
      console.log(err)
    }
  })

  it("should return error 404 if the APK doesn't exist", async () => {
    expect(deviceId).toBeDefined()
    const appInstallService = new AppInstallationService(deviceProtocol)
    const result = await appInstallService.startAppInstallation({
      filePath: "dummyPath",
      deviceId: deviceId!,
    })
    expect(result.ok).toBeFalsy()
    expect(result.error?.type).toBe(404)
  })

  it("should return success response if the APK is valid", async () => {
    expect(deviceId).toBeDefined()
    const appInstallService = new AppInstallationService(deviceProtocol)
    const apkPath = `${appPath}/${testFilesDir}/${validApkName}`
    const result = await appInstallService.startAppInstallation({
      filePath: apkPath,
      deviceId: deviceId!,
    })
    const data = result.data as StartAppInstallation
    expect(result.ok).toBeTruthy()
    let progress = 0
    await delay(500)
    while (progress < 100) {
      const checkResult = await appInstallService.getAppInstallationProgress({
        installationId: data.installationId,
        deviceId: deviceId!,
      })
      expect(checkResult.ok).toBeTruthy()
      const checkData = checkResult.data as GetAppInstallationProgress
      progress = checkData.progress
      expect(checkData.installationId).toBe(data.installationId)
      await delay(500)
    }
    expect(progress).toBe(100)
  }, 60000)

  it("should return error 401 if the APK is incompatible", async () => {
    expect(deviceId).toBeDefined()
    const appInstallService = new AppInstallationService(deviceProtocol)
    const apkPath = `${appPath}/${testFilesDir}/${incompatibleApkName}`
    const result = await appInstallService.startAppInstallation({
      filePath: apkPath,
      deviceId: deviceId!,
    })
    await delay(500)
    const data = result.data as StartAppInstallation
    expect(result.ok).toBeTruthy()

    let progress: GetAppInstallationProgress
    const checkResult = await appInstallService.getAppInstallationProgress({
      installationId: data.installationId,
      deviceId: deviceId!,
    })
    expect(checkResult.ok).toBeFalsy()
    expect(checkResult.error?.type).toBe(401)
  }, 60000)
})

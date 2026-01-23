/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import {
  ApiDevice,
  AppInstallGetResponseValidator,
  AppInstallPostResponseValidator,
  buildGetAppInstallRequest,
  buildPostAppInstallRequest,
} from "devices/api-device/models"
import { delay } from "app-utils/common"
import { execPromise } from "app-utils/main"
import { AppSerialPortService } from "app-serialport/main"
import { getApiDevice } from "./helpers/get-api-device"
import { getSerialPortService } from "./helpers/get-serial-port-service"

const testFilesDir = "test-files"
const appPath = "/storage/emulated/0/Applications"
const validApkName = "valid.apk"
const incompatibleApkName = "invalid.apk"

let device: ApiDevice
let serialPortService: AppSerialPortService

describe("App install", () => {
  beforeAll(async () => {
    device = await getApiDevice()
    serialPortService = await getSerialPortService()

    const localPath = path.join(__dirname, testFilesDir)
    try {
      const command = `adb push ${localPath} ${appPath}/`
      await execPromise(command)
    } catch (err) {
      console.log(err)
    }
  }, 20000)

  afterAll(async () => {
    try {
      const command = `adb shell rm -r /storage/emulated/0/Applications/${testFilesDir}`
      await execPromise(command)
    } catch (err) {
      console.log(err)
    }

    serialPortService.close(device.id)
  })

  it("should return error 404 if the APK doesn't exist", async () => {
    const result = await serialPortService.request(
      device.id,
      buildPostAppInstallRequest({
        filePath: "dummyPath",
      })
    )
    expect(result.status).toBe(404)
  })

  it("should return success response if the APK is valid", async () => {
    const apkPath = `${appPath}/${testFilesDir}/${validApkName}`
    const result = await serialPortService.request(
      device.id,
      buildPostAppInstallRequest({
        filePath: apkPath,
      })
    )
    const data = AppInstallPostResponseValidator.parse(result.body)
    expect(result.status).toBe(200)
    let progress = 0
    await delay(500)
    while (progress < 100) {
      const checkResult = await serialPortService.request(
        device.id,
        buildGetAppInstallRequest({
          installationId: data.installationId,
        })
      )
      expect(checkResult.status).toBe(200)
      const checkData = AppInstallGetResponseValidator.parse(checkResult.body)
      progress = checkData.progress
      expect(checkData.installationId).toBe(data.installationId)
      await delay(500)
    }
    expect(progress).toBe(100)
  }, 60000)

  it("should return error 401 if the APK is incompatible", async () => {
    const apkPath = `${appPath}/${testFilesDir}/${incompatibleApkName}`
    const result = await serialPortService.request(
      device.id,
      buildPostAppInstallRequest({
        filePath: apkPath,
      })
    )
    await delay(500)
    const data = AppInstallPostResponseValidator.parse(result.body)
    expect(result.status).toBe(200)

    const checkResult = await serialPortService.request(
      device.id,
      buildGetAppInstallRequest({
        installationId: data.installationId,
      })
    )
    expect(checkResult.status).toBe(401)
  }, 60000)
})

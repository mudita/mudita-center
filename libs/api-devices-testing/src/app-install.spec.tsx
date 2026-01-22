/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { execPromise } from "app-utils/main"
import { delay } from "app-utils/common"
import {
  ApiDevice,
  AppInstallGetResponse,
  AppInstallPostResponse,
} from "devices/api-device/models"
import { postAppInstall } from "./helpers/post-app-install"
import { getApiDevice } from "./helpers/get-api-device"
import { getAppInstall } from "./helpers/get-app-install"
import { closeApiDevice } from "./helpers/close-api-device"

const testFilesDir = "test-files"
const appPath = "/storage/emulated/0/Applications"
const validApkName = "valid.apk"
const incompatibleApkName = "invalid.apk"

let device: ApiDevice

describe("App install", () => {
  beforeAll(async () => {
    device = await getApiDevice()
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

    await closeApiDevice(device)
  })

  it("should return error 404 if the APK doesn't exist", async () => {
    const result = await postAppInstall(device, {
      filePath: "dummyPath",
    })
    expect(result.status).toBe(404)
  })

  it("should return success response if the APK is valid", async () => {
    const apkPath = `${appPath}/${testFilesDir}/${validApkName}`
    const result = await postAppInstall(device, {
      filePath: apkPath,
    })
    const data = result.body as AppInstallPostResponse
    expect(result.status).toBe(200)
    let progress = 0
    await delay(500)
    while (progress < 100) {
      const checkResult = await getAppInstall(device, {
        installationId: data.installationId,
      })
      expect(result.status).toBe(200)
      const checkData = checkResult.body as AppInstallGetResponse
      progress = checkData.progress
      expect(checkData.installationId).toBe(data.installationId)
      await delay(500)
    }
    expect(progress).toBe(100)
  }, 60000)

  it("should return error 401 if the APK is incompatible", async () => {
    const apkPath = `${appPath}/${testFilesDir}/${incompatibleApkName}`
    const result = await postAppInstall(device, {
      filePath: apkPath,
    })
    await delay(500)
    const data = result.body as AppInstallPostResponse
    expect(result.status).toBe(200)

    const checkResult = await getAppInstall(device, {
      installationId: data.installationId,
    })
    expect(checkResult.status).toBe(401)
  }, 60000)
})

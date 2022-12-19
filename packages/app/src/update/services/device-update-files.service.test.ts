/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Settings } from "App/settings/dto"
import { DeviceUpdateFilesService } from "App/update/services/device-update-files.service"
import * as getAppSettingsMainModule from "App/__deprecated__/main/functions/get-app-settings"
import loggerModule from "App/__deprecated__/main/utils/logger"
import fs from "fs-extra"
import path from "path"

const mockedSettings: Settings = {
  osDownloadLocation: "/user/mocked/",
} as Settings

let loggerSpy: jest.SpyInstance

const subject = new DeviceUpdateFilesService()

beforeEach(() => {
  jest
    .spyOn(getAppSettingsMainModule, "default")
    .mockResolvedValue(mockedSettings)

  jest.spyOn(fs, "readdir").mockResolvedValue(["file-one.tar", "file-two.tar"])

  jest
    .spyOn(path, "join")
    .mockImplementation((...args: string[]) => args.join(""))

  loggerSpy = jest.spyOn(loggerModule, "error").mockImplementation()
})

afterEach(() => {
  jest.clearAllMocks()
})

test("delete all files from the download os location", async () => {
  const deleteFileSpy = jest.spyOn(fs, "unlinkSync").mockImplementation()

  await subject.removeDownloadedOsUpdates()

  expect(deleteFileSpy).toHaveBeenCalledTimes(2)
  expect(deleteFileSpy).toHaveBeenNthCalledWith(1, "/user/mocked/file-one.tar")
  expect(deleteFileSpy).toHaveBeenNthCalledWith(2, "/user/mocked/file-two.tar")

  expect(loggerSpy).not.toHaveBeenCalled()
})

test("logs the error", async () => {
  const error = new Error("Oups!")
  jest.spyOn(fs, "unlinkSync").mockImplementation(() => {
    throw error
  })

  await subject.removeDownloadedOsUpdates()

  expect(loggerSpy).toHaveBeenCalledTimes(1)
  expect(loggerSpy).toHaveBeenLastCalledWith(error)
})

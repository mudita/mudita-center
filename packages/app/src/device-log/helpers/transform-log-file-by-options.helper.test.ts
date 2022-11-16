/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MockDate from "mockdate"
import { DeviceFile } from "App/device-file-system/dto"
import { DeviceFilesOption } from "App/device-file-system/types"
import { transformDeviceFilesByOption } from "App/device-log/helpers/transform-log-file-by-options.helper"
import {
  firstsPartDecodeLog,
  secondsPartDecodeLog,
} from "App/testing-support/mocks/diagnostic-data.mock"

MockDate.set("1095-1-1")

const deviceOptionWithPrefixMock: DeviceFilesOption = {
  datePrefix: true,
}

const deviceOptionWithoutPrefixMock: DeviceFilesOption = {
  datePrefix: false,
}

const deviceFileMock: DeviceFile = {
  name: "test-log.hex",
  data: Buffer.from(`${firstsPartDecodeLog}${secondsPartDecodeLog}`),
}

test("returns files list with name prefixed with date if `datePrefix` is equal to `true`", () => {
  expect(
    transformDeviceFilesByOption([deviceFileMock], deviceOptionWithPrefixMock)
  ).toEqual([
    {
      ...deviceFileMock,
      name: "1095-01-01-test-log.hex",
    },
  ])
})

test("returns original files list if `datePrefix` is equal to `false`", () => {
  expect(
    transformDeviceFilesByOption(
      [deviceFileMock],
      deviceOptionWithoutPrefixMock
    )
  ).toEqual([deviceFileMock])
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import BackupInfo from "Common/interfaces/backup-info"
import { getLastBackUp } from "./get-last-back-up.helpers"

const backupInfoMock: DeviceResponse<BackupInfo> = {
  status: DeviceResponseStatus.Ok,
  data: {
    backups: [
      {
        createdAt: "2020-01-14T11:31:08.244Z",
        size: 10,
      },
      {
        createdAt: "2021-01-14T11:31:08.244Z",
        size: 10,
      },
    ],
  },
}

const emptyResponseMock: DeviceResponse<BackupInfo> = {
  status: DeviceResponseStatus.Ok,
  data: {
    backups: [],
  },
}

test("returns undefined if backup list is empty", () => {
  expect(getLastBackUp(emptyResponseMock)).toBeUndefined()
})

test("returns last backup if backups list provided", () => {
  expect(getLastBackUp(backupInfoMock)).toEqual({
    createdAt: "2021-01-14T11:31:08.244Z",
    size: 10,
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const makeSuccessDeviceResponse = async (
  data: any
): Promise<DeviceResponse<any>> => {
  return {
    data,
    status: DeviceResponseStatus.Ok,
  }
}

export const commonCalls = {
  [IpcRequest.GetDeviceInfo]: makeSuccessDeviceResponse({
    name: "Ziemniaczek",
    modelName: "U12300000",
    modelNumber: "A1239999",
    serilaNumber: "a-b-3d",
    osVersion: "0.123v",
    osUpdateDate: "12-12-2003",
  }),
  [IpcRequest.GetNetworkInfo]: makeSuccessDeviceResponse({
    simCards: [
      {
        active: true,
        network: "Y-Mobile",
        networkLevel: 0.5,
        number: 12345678,
        slot: 1,
      },
      {
        active: false,
        network: "X-Mobile",
        networkLevel: 0.69,
        number: 7001234523,
        slot: 2,
      },
    ],
  }),
  [IpcRequest.GetStorageInfo]: makeSuccessDeviceResponse({
    capacity: 9001,
    available: 99999999999999,
    categories: [
      { label: "music", filesCount: 1233333, size: 999999999 },
      { label: "storage", filesCount: 100000, size: 999999999 },
    ],
  }),
  [IpcRequest.GetBatteryInfo]: makeSuccessDeviceResponse({
    level: 9001,
    charging: false,
    maximumCapacity: 99999,
  }),
  [IpcRequest.GetBackupsInfo]: makeSuccessDeviceResponse({
    backups: [
      {
        createdAt: "20-11-15T07:35:01.562Z20",
        size: 99999,
      },
      {
        createdAt: "20-01-30T07:35:01.562Z20",
        size: 1234567,
      },
    ],
  }),
}

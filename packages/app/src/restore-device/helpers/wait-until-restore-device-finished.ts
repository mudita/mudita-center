/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GetRestoreDeviceStatusDataState } from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getRestoreDeviceStatus from "Renderer/requests/get-restore-device-status.request"
import getUnlockDeviceStatus from "Renderer/requests/get-unlock-device-status.request"

const timeout = 5000
const callsMax = 24

const waitUntilGetRestoreDeviceStatusNoResponse = async (
  id: string,
  firstRequest = true,
  index = 0
): Promise<DeviceResponse> => {
  if (index === callsMax) {
    return {
      status: DeviceResponseStatus.Error,
    }
  }

  const response = await getRestoreDeviceStatus({ id })
  if (response.data?.state === GetRestoreDeviceStatusDataState.Finished) {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  if (!firstRequest && response.status === DeviceResponseStatus.Error) {
    return { status: DeviceResponseStatus.Ok }
  }

  if (response.status === DeviceResponseStatus.Error) {
    return {
      status: DeviceResponseStatus.Error,
    }
  }

  if (response.data?.state === GetRestoreDeviceStatusDataState.Error) {
    return {
      status: DeviceResponseStatus.Error,
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitUntilGetRestoreDeviceStatusNoResponse(id, false, ++index))
    }, timeout)
  })
}

const waitUntilGetUnlockDeviceStatusResponse = async (
  index = 0
): Promise<DeviceResponse> => {
  if (index === callsMax) {
    return {
      status: DeviceResponseStatus.Error,
    }
  }

  const response = await getUnlockDeviceStatus()
  if (
    response.status === DeviceResponseStatus.Ok ||
    response.status === DeviceResponseStatus.PhoneLocked
  ) {
    return {
      status: DeviceResponseStatus.Ok,
    }
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(waitUntilGetUnlockDeviceStatusResponse(++index))
      }, timeout)
    })
  }
}

export const waitUntilRestoreDeviceFinished = async (
  id: string
): Promise<DeviceResponse> => {
  const response = await waitUntilGetRestoreDeviceStatusNoResponse(id)

  if (response.status === DeviceResponseStatus.Error) {
    return {
      status: DeviceResponseStatus.Error,
    }
  }

  return waitUntilGetUnlockDeviceStatusResponse()
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { GetRestoreDeviceStatusDataState } from "@mudita/pure"
import getRestoreDeviceStatus from "App/__deprecated__/renderer/requests/get-restore-device-status.request"
import getUnlockDeviceStatus from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const timeout = 5000
const callsMax = 24

const waitUntilGetRestoreDeviceStatusNoResponse = async (
  id: string,
  firstRequest = true,
  index = 0
): Promise<RequestResponse> => {
  if (index === callsMax) {
    return {
      status: RequestResponseStatus.Error,
    }
  }

  const response = await getRestoreDeviceStatus({ id })
  if (response.data?.state === GetRestoreDeviceStatusDataState.Finished) {
    return {
      status: RequestResponseStatus.Ok,
    }
  }

  if (!firstRequest && response.status === RequestResponseStatus.Error) {
    return { status: RequestResponseStatus.Ok }
  }

  if (response.status === RequestResponseStatus.Error) {
    return {
      status: RequestResponseStatus.Error,
    }
  }

  if (response.data?.state === GetRestoreDeviceStatusDataState.Error) {
    return {
      status: RequestResponseStatus.Error,
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
): Promise<RequestResponse> => {
  if (index === callsMax) {
    return {
      status: RequestResponseStatus.Error,
    }
  }

  const response = await getUnlockDeviceStatus()
  if (
    response.status === RequestResponseStatus.Ok ||
    response.status === RequestResponseStatus.PhoneLocked
  ) {
    return {
      status: RequestResponseStatus.Ok,
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
): Promise<RequestResponse> => {
  const response = await waitUntilGetRestoreDeviceStatusNoResponse(id)

  if (response.status === RequestResponseStatus.Error) {
    return {
      status: RequestResponseStatus.Error,
    }
  }

  return waitUntilGetUnlockDeviceStatusResponse()
}

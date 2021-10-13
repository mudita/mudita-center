/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import getRestoreDeviceStatus from "Renderer/requests/get-restore-device-status.request"
import { isResponsesSuccessWithData } from "Renderer/utils/is-responses-success-with-data.helpers"
import { GetRestoreDeviceStatusDataState } from "@mudita/pure"
import getUnlockDeviceStatus from "Renderer/requests/get-unlock-device-status.request"

export const waitUntilRestoreDeviceFinished = async (
  id: string,
  firstRequest = true
): Promise<DeviceResponse> => {
  if (firstRequest) {
    const response = await getRestoreDeviceStatus({ id })
    if (
      !isResponsesSuccessWithData([response]) ||
      response.data?.state === GetRestoreDeviceStatusDataState.Error
    ) {
      return { status: DeviceResponseStatus.Error }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitUntilRestoreDeviceFinished(id, false))
        }, 20000)
      })
    }
  } else {
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
          resolve(waitUntilRestoreDeviceFinished(id, false))
        }, 5000)
      })
    }
  }
}

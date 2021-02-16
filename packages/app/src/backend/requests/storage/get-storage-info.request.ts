/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import StorageInfo from "Common/interfaces/storage-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const handleDeviceStorageRequest = async ({
  pureStorage,
}: Adapters): Promise<DeviceResponse<StorageInfo>> => {
  const responses = await Promise.all([
    pureStorage.getAvailableSpace(),
    pureStorage.getCapacity(),
  ])

  if (
    responses.every(
      ({ status, data }) =>
        status === DeviceResponseStatus.Ok && data !== undefined
    )
  ) {
    const getAvailableSpaceResponse = responses[0].data as number
    const getCapacityResponse = responses[1].data as number

    return {
      status: DeviceResponseStatus.Ok,
      data: {
        available: getAvailableSpaceResponse,
        capacity: getCapacityResponse,
        categories: pureStorage.getStorageCategories(),
      },
    }
  } else {
    return {
      status: DeviceResponseStatus.Error,
    }
  }
}

const registerPurePhoneStorageRequest = createEndpoint({
  name: IpcRequest.GetStorageInfo,
  handler: handleDeviceStorageRequest,
})

export default registerPurePhoneStorageRequest

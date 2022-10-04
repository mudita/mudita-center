/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import StorageInfo from "App/__deprecated__/common/interfaces/storage-info.interface"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

const handleDeviceStorageRequest = async ({
  pureStorage,
}: Adapters): Promise<RequestResponse<StorageInfo>> => {
  const responses = await Promise.all([
    pureStorage.getSystemReservedSpace(),
    pureStorage.getTotalSpace(),
    pureStorage.getUsedUserSpace(),
  ])

  if (
    responses.every(
      ({ status, data }) =>
        status === RequestResponseStatus.Ok && data !== undefined
    )
  ) {
    const getSystemReservedSpaceResponse = responses[0].data as number
    const getTotalSpaceResponse = responses[1].data as number
    const getUsedUserSpaceResponse = responses[2].data as number

    return {
      status: RequestResponseStatus.Ok,
      data: {
        reservedSpace: getSystemReservedSpaceResponse,
        categories: pureStorage.getStorageCategories(),
        totalSpace: getTotalSpaceResponse,
        usedUserSpace: getUsedUserSpaceResponse,
      },
    }
  } else {
    return {
      status: RequestResponseStatus.Error,
    }
  }
}

const registerPurePhoneStorageRequest = createEndpoint({
  name: IpcRequest.GetStorageInfo,
  handler: handleDeviceStorageRequest,
})

export default registerPurePhoneStorageRequest

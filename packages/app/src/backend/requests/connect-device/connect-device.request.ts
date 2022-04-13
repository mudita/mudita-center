/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDevice } from "@mudita/pure"
import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleConnectDevice = ({
  purePhone,
}: Adapters): Promise<RequestResponse<MuditaDevice>> => {
  return purePhone.connectDevice()
}

const registerConnectDeviceRequest = createEndpoint({
  name: IpcRequest.ConnectDevice,
  handler: handleConnectDevice,
})

export default registerConnectDeviceRequest

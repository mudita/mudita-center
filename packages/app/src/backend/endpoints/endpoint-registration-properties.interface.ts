/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

import { IpcDeviceFileSystem } from "App/device-file-system"

export default interface EndpointRegistrationProperties<CallerProps, Response> {
  name: IpcRequest | IpcDeviceFileSystem
  handler: (
    adapters: Adapters,
    callerProps: CallerProps
  ) => Response | PromiseLike<Response>
}

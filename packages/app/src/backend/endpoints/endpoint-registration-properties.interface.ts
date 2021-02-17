/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

export default interface EndpointRegistrationProperties<CallerProps, Response> {
  name: IpcRequest
  handler: (
    adapters: Adapters,
    callerProps: CallerProps
  ) => Response | PromiseLike<Response>
}

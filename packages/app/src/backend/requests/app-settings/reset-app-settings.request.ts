/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { AppSettings } from "App/main/store/settings.interface"

const handleAppSettingsResetRequest = async ({
  appSettings,
}: Adapters): Promise<Partial<AppSettings>> =>
  await appSettings.resetAppSettings()

const registerAppSettingsResetRequest = createEndpoint({
  name: IpcRequest.ResetAppSettings,
  handler: handleAppSettingsResetRequest,
})

export default registerAppSettingsResetRequest

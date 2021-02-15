/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"

const handleAppSettingsUpdateRequest = async (
  { appSettings }: Adapters,
  option: SettingsUpdateOption
): Promise<Partial<AppSettings>> => await appSettings.updateAppSettings(option)

const registerAppSettingsUpdateRequest = createEndpoint({
  name: IpcRequest.UpdateAppSettings,
  handler: handleAppSettingsUpdateRequest,
})

export default registerAppSettingsUpdateRequest

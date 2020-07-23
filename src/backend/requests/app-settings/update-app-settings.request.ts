import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { AppSettings } from "App/main/default-app-settings"

const handleAppSettingsUpdateRequest = async (
  { appSettings }: Adapters,
  settings: AppSettings
): Promise<void> => await appSettings.updateAppSettings(settings)

const registerAppSettingsUpdateRequest = createEndpoint({
  name: IpcRequest.UpdateAppSettings,
  handler: handleAppSettingsUpdateRequest,
})

export default registerAppSettingsUpdateRequest

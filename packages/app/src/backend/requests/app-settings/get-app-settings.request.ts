import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { AppSettings } from "App/main/store/settings.interface"

const handleAppSettingsRequest = async ({
  appSettings,
}: Adapters): Promise<AppSettings> => await appSettings.getAppSettings()

const registerAppSettingsRequest = createEndpoint({
  name: IpcRequest.GetAppSettings,
  handler: handleAppSettingsRequest,
})

export default registerAppSettingsRequest

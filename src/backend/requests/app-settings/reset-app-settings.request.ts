import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleAppSettingsResetRequest = async ({
  appSettings,
}: Adapters): Promise<void> => await appSettings.resetAppSettings()

const registerAppSettingsResetRequest = createEndpoint({
  name: IpcRequest.ResetAppSettings,
  handler: handleAppSettingsResetRequest,
})

export default registerAppSettingsResetRequest

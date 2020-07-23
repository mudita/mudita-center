import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { LocationPath } from "Renderer/modules/settings/tabs/backup/location-path.enum"

const handleAppLocationSettingsUpdateRequest = async (
  { appSettings }: Adapters,
  location: LocationPath
): Promise<null | boolean | string> =>
  await appSettings.updateLocationSettings(location)

const registerAppSettingsUpdateLocationRequest = createEndpoint({
  name: IpcRequest.UpdateAppSettingsLocation,
  handler: handleAppLocationSettingsUpdateRequest,
})

export default registerAppSettingsUpdateLocationRequest

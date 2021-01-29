import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"
import fs from "fs-extra"
import { app } from "electron"
import { name } from "../../../../package.json"
import path from "path"

const handleUpdateOs = async (
  { purePhone }: Adapters,
  { fileName, progressChannel }: { fileName: string; progressChannel: string }
): Promise<DeviceResponse> => {
  const { pureOsDownloadLocation } = await fs.readJSON(
    `${app.getPath("appData")}/${name}/settings.json`
  )
  const filePath = path.join(pureOsDownloadLocation, fileName)
  return purePhone.updateOs(filePath, progressChannel)
}

const registerUpdateOsRequest = createEndpoint({
  name: IpcRequest.UpdateOs,
  handler: handleUpdateOs,
})

export default registerUpdateOsRequest

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import BackupInfo from "Common/interfaces/backup-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

const handleBackupsInfoRequest = async ({
  pureBackups,
}: Adapters): Promise<DeviceResponse<BackupInfo>> => {
  const response = await pureBackups.getBackups()
  if(response.status === DeviceResponseStatus.Ok && response.data){
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        backups: response.data,
      }
    }
  } else {
    return {
      status: DeviceResponseStatus.Error
    }
  }
}

const registerBackupsInfoRequest = createEndpoint({
  name: IpcRequest.GetBackupsInfo,
  handler: handleBackupsInfoRequest,
})

export default registerBackupsInfoRequest

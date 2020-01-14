import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import StorageInfo from "Common/interfaces/storage-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleDeviceStorageRequest = ({ pureStorage }: Adapters): StorageInfo => {
  return {
    available: pureStorage.getAvailableSpace(),
    capacity: pureStorage.getCapacity(),
    categories: pureStorage.getStorageCategories(),
  }
}

const registerPurePhoneStorageRequest = createEndpoint({
  name: IpcRequest.GetStorageInfo,
  handler: handleDeviceStorageRequest,
})

export default registerPurePhoneStorageRequest

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DeviceInfo from "Common/interfaces/device-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

/**
 * Return the device information taken from the Electron `app` object.
 * Serves as an example requests that most likely won't be used later.
 */
const handleDeviceInfoRequest = ({ purePhone }: Adapters): DeviceInfo => {
  return {
    modelName: purePhone.getModelName(),
    modelNumber: purePhone.getModelNumber(),
    name: purePhone.getName(),
    osUpdateDate: purePhone.getOsUpdateDate(),
    osVersion: purePhone.getOsVersion(),
    serialNumber: purePhone.getSerialNumber(),
  }
}

const registerDeviceInfoRequest = createEndpoint({
  name: IpcRequest.GetDeviceInfo,
  handler: handleDeviceInfoRequest,
})

export default registerDeviceInfoRequest

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DeviceInfo from "Common/interfaces/device-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const handleDeviceInfoRequest = async ({
  purePhone,
}: Adapters): Promise<DeviceResponse<DeviceInfo>> => {
  const getOsVersionResponse = await purePhone.getOsVersion()

  if (
    getOsVersionResponse.status === DeviceResponseStatus.Ok &&
    getOsVersionResponse.data
  ) {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        modelName: purePhone.getModelName(),
        modelNumber: purePhone.getModelNumber(),
        name: purePhone.getName(),
        osUpdateDate: purePhone.getOsUpdateDate(),
        osVersion: getOsVersionResponse.data,
        serialNumber: purePhone.getSerialNumber(),
      },
    }
  } else {
    return {
      status: DeviceResponseStatus.Error,
    }
  }
}

const registerDeviceInfoRequest = createEndpoint({
  name: IpcRequest.GetDeviceInfo,
  handler: handleDeviceInfoRequest,
})

export default registerDeviceInfoRequest

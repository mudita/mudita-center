import { Endpoint, Method, RequestConfig } from "pure"
import DeviceService from "./device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "./adapters/device-response.interface"

const mockPureData = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: 19,
    numbers: ["500400300"],
    priName: "Alek",
  },
]

class MockPureNodeService extends DeviceService {
  request({
    body,
    endpoint,
    method,
  }: RequestConfig): Promise<DeviceResponse<any>> {
    return new Promise((resolve) => {
      if (
        endpoint === Endpoint.Contacts &&
        method === Method.Get &&
        body.count === true
      ) {
        return resolve({ data: { count: 1 }, status: DeviceResponseStatus.Ok })
      } else if (
        endpoint === Endpoint.Contacts &&
        method === Method.Get &&
        typeof body.count === "number"
      ) {
        return resolve({
          data: mockPureData,
          status: DeviceResponseStatus.Ok,
        })
      } else {
        return resolve({
          status: DeviceResponseStatus.Error,
        })
      }
    })
  }
}

export default MockPureNodeService

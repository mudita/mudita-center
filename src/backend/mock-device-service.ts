import { Contact as PureContact, Endpoint, Method, RequestConfig } from "pure"
import DeviceService from "./device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "./adapters/device-response.interface"
import { Contact, NewContact } from "Renderer/models/phone/phone.typings"

export const pureContactId = 19

export const newContact: NewContact = {
  firstName: "Alek",
  lastName: "Boligłowa",
  primaryPhoneNumber: "500400300",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  firstAddressLine: "6 Czeczota St.",
  secondAddressLine: "02600 Warsaw",
  favourite: true,
  blocked: false,
  ice: false,
}

export const contact: Contact = {
  ...newContact,
  id: String(pureContactId),
} as Contact

const mockPureData: PureContact[] = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: pureContactId,
    numbers: ["500400300"],
    priName: "Alek",
  },
]

class MockPureNodeService extends DeviceService {
  async request({
    body,
    endpoint,
    method,
  }: RequestConfig): Promise<DeviceResponse<any>> {
    if (
      endpoint === Endpoint.Contacts &&
      method === Method.Get &&
      body.count === true
    ) {
      return { data: { count: 1 }, status: DeviceResponseStatus.Ok }
    } else if (
      endpoint === Endpoint.Contacts &&
      method === Method.Get &&
      typeof body.count === "number"
    ) {
      return {
        data: mockPureData,
        status: DeviceResponseStatus.Ok,
      }
    } else if (endpoint === Endpoint.Contacts && method === Method.Put) {
      return {
        data: mockPureData,
        status: DeviceResponseStatus.Ok,
      }
    } else if (endpoint === Endpoint.Contacts && method === Method.Delete) {
      return {
        status: DeviceResponseStatus.Ok,
        data: mockPureData[0].id,
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }
}

export default MockPureNodeService

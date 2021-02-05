import {
  Contact as PureContact,
  DeviceInfo,
  Endpoint,
  Method,
  RequestConfig,
} from "@mudita/mudita-center-pure"
import DeviceService from "./device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "./adapters/device-response.interface"
import { Contact, NewContact } from "App/contacts/store/contacts.type"

export const pureContactId = "19"

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

const mockDeviceInfo: DeviceInfo = ({
  accessTechnology: "255",
  batteryLevel: "35",
  batteryState: "1",
  currentRTCTime: "3000",
  fsFree: "13727",
  fsFreePercent: "99",
  fsTotal: "13913",
  gitBranch: "EGD-4318_enable_service_desktop",
  gitRevision: "4973bab",
  gitTag: "release-0.46.1-33-g4973babd",
  networkStatus: "2",
  selectedSim: "0",
  signalStrength: "1",
  trayState: "1",
} as unknown) as DeviceInfo

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
        data: { id: pureContactId },
        status: DeviceResponseStatus.Ok,
      }
    } else if (endpoint === Endpoint.DeviceInfo && method === Method.Get) {
      return {
        data: mockDeviceInfo,
        status: DeviceResponseStatus.Ok,
      }
    } else if (endpoint === Endpoint.Contacts && method === Method.Post) {
      return {
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

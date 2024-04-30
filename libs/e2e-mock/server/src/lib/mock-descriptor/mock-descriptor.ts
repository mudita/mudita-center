/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { find } from "lodash"
import { PortInfo } from "serialport"
import { AddKompakt, AddKompaktResponse } from "./mock-descriptor-validators"
import DEFAULT_RESPONSES, {
  MockResponsesMap,
} from "../mock-device/default-responses"
import { APIEndpointType, APIMethodsType } from "device/models"

const KOMPAKT_PORT_INFO: Omit<PortInfo, "path" | "serialNumber"> = {
  manufacturer: "Mudita",
  pnpId: undefined,
  locationId: "00140000",
  vendorId: "0e8d",
  productId: "2006",
}

class MockDescriptor {
  private _mockResponsesPerDevice: Record<string, MockResponsesMap> = {}
  private _mockResponsesPerDeviceOnce: Record<string, MockResponsesMap> = {}

  private _devices: PortInfo[] = []

  get devices() {
    return this._devices
  }

  public addKompakt({ path, serialNumber }: AddKompakt) {
    this.addDevice({ ...KOMPAKT_PORT_INFO, path, serialNumber })
  }

  private addDevice(portInfo: PortInfo) {
    const existingDevice = find(this._devices, { path: portInfo.path })
    if (existingDevice === undefined) {
      this._devices = [...this.devices, portInfo]
    }
  }

  public removeDevice(path: string) {
    this._devices = this._devices.filter((item) => item.path != path)
    delete this._mockResponsesPerDevice[path]
  }

  public addResponse({
    body,
    endpoint,
    method,
    path,
    status,
  }: AddKompaktResponse) {
    this._mockResponsesPerDevice[path] = {
      ...this._mockResponsesPerDevice[path],
      [endpoint]: {
        ...this._mockResponsesPerDevice[path]?.[endpoint],
        [method]: {
          status,
          body,
        },
      },
    }
  }

  public addResponseOnce({
    body,
    endpoint,
    method,
    path,
    status,
  }: AddKompaktResponse) {
    this._mockResponsesPerDeviceOnce[path] = {
      ...this._mockResponsesPerDeviceOnce[path],
      [endpoint]: {
        ...this._mockResponsesPerDeviceOnce[path]?.[endpoint],
        [method]: {
          status,
          body,
        },
      },
    }
  }

  public getResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType
  ) {
    // console.log(path, endpoint, method)
    // console.log(this._mockResponsesPerDevice)

    const perDeviceOnceResponse =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method]
    if (perDeviceOnceResponse !== undefined) {
      delete this._mockResponsesPerDevice[path]?.[endpoint]?.[method]
      return perDeviceOnceResponse
    }
    const perDeviceResponse =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method]
    if (perDeviceResponse !== undefined) return perDeviceResponse
    const defaultResponse = DEFAULT_RESPONSES[endpoint]?.[method]
    // endpoint !== "OUTBOX" && console.log(endpoint, defaultResponse)

    return defaultResponse
  }
}

export const mockDescriptor = new MockDescriptor()

export const getMockedDevices = () => {
  return mockDescriptor.devices
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { find, findIndex, merge, pullAt } from "lodash"
import { PortInfo } from "serialport"
import {
  AddKompakt,
  AddKompaktResponse,
  RestoreDefaultResponses,
} from "./mock-descriptor-validators"
import {
  ApiResponsesWithConfigArray,
  ApiResponseWithConfig,
  DEFAULT_RESPONSES,
  MocksArrayResponsesMap,
} from "e2e-mock-responses"
import { APIEndpointType, APIMethodsType } from "device/models"
import { ApiResponse } from "Core/device/types/mudita-os"

const KOMPAKT_PORT_INFO: Omit<PortInfo, "path" | "serialNumber"> = {
  manufacturer: "Mudita",
  pnpId: undefined,
  locationId: "00140000",
  vendorId: "0e8d",
  productId: "2006",
}

class MockDescriptor {
  private _mockResponsesPerDevice: Record<string, MocksArrayResponsesMap> = {}
  private _mockResponsesPerDeviceOnce: Record<string, MocksArrayResponsesMap> =
    {}

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
    match,
  }: AddKompaktResponse) {
    const currentResponses =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method] ?? []

    const filteredResponses = currentResponses.filter((item) => {
      if (item.match === undefined) {
        return match !== undefined
      }
      return JSON.stringify(item.match) !== JSON.stringify(match)
    })

    this._mockResponsesPerDevice[path] = {
      ...this._mockResponsesPerDevice[path],
      [endpoint]: {
        ...this._mockResponsesPerDevice[path]?.[endpoint],
        [method]: [
          ...filteredResponses,
          {
            status,
            body,
            match,
          },
        ],
      },
    }
  }

  public removeResponses({ path, requests }: RestoreDefaultResponses) {
    requests?.forEach((request) => {
      if (
        this._mockResponsesPerDevice[path]?.[request.endpoint]?.[request.method]
      ) {
        this._mockResponsesPerDevice[path][request.endpoint]![request.method] =
          undefined
      }
      if (
        this._mockResponsesPerDeviceOnce[path]?.[request.endpoint]?.[
          request.method
        ]
      ) {
        this._mockResponsesPerDeviceOnce[path][request.endpoint]![
          request.method
        ] = undefined
      }
    })
  }

  public addResponseOnce({
    body,
    endpoint,
    method,
    path,
    status,
    match,
  }: AddKompaktResponse) {
    const currentResponses =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method] ?? []

    const filteredResponses = currentResponses.filter((item) => {
      if (item.match === undefined) {
        return match !== undefined
      }
      return JSON.stringify(item.match) !== JSON.stringify(match)
    })

    this.setResponseOnce({
      path,
      endpoint,
      method,
      responses: [
        ...filteredResponses,
        {
          status,
          body,
          match,
        },
      ],
    })
  }

  private setResponseOnce({
    path,
    endpoint,
    method,
    responses,
  }: Pick<AddKompaktResponse, "path" | "method" | "endpoint"> & {
    responses: ApiResponseWithConfig[]
  }) {
    this._mockResponsesPerDeviceOnce[path] = {
      ...this._mockResponsesPerDeviceOnce[path],
      [endpoint]: {
        ...this._mockResponsesPerDeviceOnce[path]?.[endpoint],
        [method]: [...responses],
      },
    }
  }

  private findResponse(
    responses: ApiResponsesWithConfigArray,
    body: Record<string, unknown> | undefined
  ) {
    const matchArray = responses.map((item) => item.match?.expected)
    const matchIndex = findIndex(matchArray, body)
    if (matchIndex > -1) {
      const response = responses[matchIndex]

      return {
        response,
        index: matchIndex,
      }
    }

    const index = findIndex(responses, (item) => !item.match)

    if (index > -1) {
      const response = responses[index]

      return {
        response,
        index: index,
      }
    }

    return
  }

  private getPerDeviceOnceResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): ApiResponse<unknown> | undefined {
    const perDeviceOnceResponses =
      this._mockResponsesPerDeviceOnce[path]?.[endpoint]?.[method]
    if (perDeviceOnceResponses !== undefined) {
      const foundResponse = this.findResponse(perDeviceOnceResponses, body)
      if (foundResponse) {
        pullAt(perDeviceOnceResponses, [foundResponse.index])
        this.setResponseOnce({
          path,
          endpoint,
          method,
          responses: perDeviceOnceResponses,
        })
        return this.mapResponseWithoutMatch(
          merge(
            foundResponse.response,
            this.fillEndpointSpecificFields(endpoint, method, body)
          )
        )
      }
    }
    return undefined
  }

  private fillEndpointSpecificFields(
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ) {
    if ((method === "POST" || method === "GET") && endpoint === "PRE_BACKUP") {
      return {
        body: {
          backupId: body?.["backupId"],
        },
      }
    }
    return undefined
  }

  private getPerDeviceResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): ApiResponse<unknown> | undefined {
    const perDeviceResponses =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method]
    if (perDeviceResponses !== undefined) {
      const foundResponse = this.findResponse(perDeviceResponses, body)

      if (foundResponse) {
        return this.mapResponseWithoutMatch(
          merge(
            foundResponse.response,
            this.fillEndpointSpecificFields(endpoint, method, body)
          )
        )
      }
    }
    return undefined
  }

  private getDefaultResponse(
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): ApiResponse<unknown> | undefined {
    const perDeviceResponses = DEFAULT_RESPONSES[endpoint]?.[method]
    if (perDeviceResponses !== undefined) {
      const foundResponse = this.findResponse(perDeviceResponses, body)
      if (foundResponse) {
        return this.mapResponseWithoutMatch(foundResponse.response)
      }
    }
    return undefined
  }

  public getResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): ApiResponse<unknown> | undefined {
    const onceResponse = this.getPerDeviceOnceResponse(
      path,
      endpoint,
      method,
      body
    )
    if (onceResponse) {
      return onceResponse
    }

    const response = this.getPerDeviceResponse(path, endpoint, method, body)
    if (response) {
      return response
    }

    const defaultResponse = this.getDefaultResponse(endpoint, method, body)

    return defaultResponse
  }

  private mapResponseWithoutMatch({
    match,
    ...response
  }: ApiResponseWithConfig): ApiResponse<unknown> {
    return response
  }
}

export const mockDescriptor = new MockDescriptor()

export const getMockedDevices = () => {
  return mockDescriptor.devices
}

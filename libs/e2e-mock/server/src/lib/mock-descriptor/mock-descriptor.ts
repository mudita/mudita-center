/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { find, findIndex, pullAt } from "lodash"
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
import { compareObjectsWithWildcard } from "./compare-objects-with-wildcard"
import { delay } from "shared/utils"

const KOMPAKT_PORT_INFO: Omit<PortInfo, "path" | "serialNumber"> = {
  manufacturer: "Mudita",
  pnpId: undefined,
  locationId: "00140000",
  vendorId: "3310",
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

  public removeDevice(path: string) {
    this._devices = this._devices.filter((item) => item.path != path)
    delete this._mockResponsesPerDevice[path]
  }

  public addResponses(responses: AddKompaktResponse[]) {
    responses.forEach((response) => {
      this.addResponse(response)
    })
  }

  public addResponse({
    body,
    endpoint,
    method,
    path,
    status,
    match,
    delay,
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
            delay,
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

  public addResponsesOnce(responses: AddKompaktResponse[]) {
    responses.forEach((response) => {
      this.addResponseOnce(response)
    })
  }

  public addResponseOnce({
    body,
    endpoint,
    method,
    path,
    status,
    match,
    delay,
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
          delay,
        },
      ],
    })
  }

  public async getResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): Promise<ApiResponse<unknown> | undefined> {
    const onceResponse = await this.getPerDeviceOnceResponse(
      path,
      endpoint,
      method,
      body
    )
    if (onceResponse) {
      return onceResponse
    }
    const response = await this.getPerDeviceResponse(
      path,
      endpoint,
      method,
      body
    )
    if (response) {
      return response
    }
    const defaultResponse = await this.getDefaultResponse(
      endpoint,
      method,
      body
    )

    return defaultResponse
  }

  private addDevice(portInfo: PortInfo) {
    const existingDevice = find(this._devices, { path: portInfo.path })
    if (existingDevice === undefined) {
      this._devices = [...this.devices, portInfo]
    }
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

  private async findResponse(
    responses: ApiResponsesWithConfigArray,
    body: Record<string, unknown> | undefined
  ) {
    const matchArray = responses.map((item) => item.match?.expected)
    const matchIndex = findIndex(matchArray, (item) =>
      compareObjectsWithWildcard(item, body)
    )
    if (matchIndex > -1) {
      const response = responses[matchIndex]
      if (response.delay) {
        await delay(response.delay)
      }
      return {
        response,
        index: matchIndex,
      }
    }

    const index = findIndex(responses, (item) => !item.match)

    if (index > -1) {
      const response = responses[index]
      if (response.delay) {
        await delay(response.delay)
      }
      return {
        response,
        index: index,
      }
    }

    return
  }

  private async getPerDeviceOnceResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): Promise<ApiResponse<unknown> | undefined> {
    const perDeviceOnceResponses =
      this._mockResponsesPerDeviceOnce[path]?.[endpoint]?.[method]
    if (perDeviceOnceResponses !== undefined) {
      const foundResponse = await this.findResponse(
        perDeviceOnceResponses,
        body
      )
      if (foundResponse) {
        if (foundResponse.response.delay) {
          delay(foundResponse.response.delay)
        }
        pullAt(perDeviceOnceResponses, [foundResponse.index])
        this.setResponseOnce({
          path,
          endpoint,
          method,
          responses: perDeviceOnceResponses,
        })
        return this.mapResponseWithoutMatch(foundResponse.response)
      }
    }
    return undefined
  }

  private async getPerDeviceResponse(
    path: string,
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): Promise<ApiResponse<unknown> | undefined> {
    const perDeviceResponses =
      this._mockResponsesPerDevice[path]?.[endpoint]?.[method]
    if (perDeviceResponses !== undefined) {
      const foundResponse = await this.findResponse(perDeviceResponses, body)

      if (foundResponse) {
        return this.mapResponseWithoutMatch(foundResponse.response)
      }
    }
    return undefined
  }

  private async getDefaultResponse(
    endpoint: APIEndpointType,
    method: APIMethodsType,
    body: Record<string, unknown> | undefined
  ): Promise<ApiResponse<unknown> | undefined> {
    const perDeviceResponses = DEFAULT_RESPONSES[endpoint]?.[method]
    if (perDeviceResponses !== undefined) {
      const foundResponse = await this.findResponse(perDeviceResponses, body)
      if (foundResponse) {
        return this.mapResponseWithoutMatch(foundResponse.response)
      }
    }
    return undefined
  }

  private mapResponseWithoutMatch({
    match,
    delay,
    ...response
  }: ApiResponseWithConfig): ApiResponse<unknown> {
    return response
  }
}

export const mockDescriptor = new MockDescriptor()

export const getMockedDevices = () => {
  return mockDescriptor.devices
}

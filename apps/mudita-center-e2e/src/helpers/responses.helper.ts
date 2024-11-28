/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { cloneDeep, merge } from "lodash"
import { ResponseStatus } from "Core/device"
import {
  APIEndpointType,
  APIMethodsType,
  EntitiesConfig,
  MCLang,
} from "Libs/device/models/src"
import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"

type ResponseConfig = {
  path: string
  status: ResponseStatus
  body: {}
  data?: {}
  expected?: {}
}

type ApiConfig = ResponseConfig & {
  body: {
    apiVersion: string
    lang?: MCLang
    variant?: string
    productId: string
    vendorId: string
    serialNumber?: string
    features: string[]
    entityTypes?: string[] // TODO: sprawdzic czy opcjonalne
  }
}

type MenuConfig = ResponseConfig & {
  body: {
    title?: string
    menuItems: {
      feature: string
      displayName: string
      icon: string
    }[]
  }
}

type OutboxConfig = ResponseConfig & {
  body: {
    features?: string[]
    entities?: entitiesType[]
    data?: string[]
  }
}

type entitiesType =
  | {
      entityType: string
      entityId: string
      action: "deleted" | "modified"
    }
  | {
      entityType: string
      entityId?: never
      action?: never
    }

type FeatureConfig = ResponseConfig & {
  expected?: {
    feature: string
    lang: MCLang
  }
}

type OverviewConfig = {
  body: {
    summary?: {
      about?: {
        // TODO w dokumentacji sarText, w kodzie sar
        // ktore opcjonalne?
        sar: {
          text: string
        }
        serialNumber: {
          text: string
        }
        imei1: {
          text: string
        }
        imei2: {
          text: string
        }
      }
    }
    sections?: {
      status?: {
        battery: {
          icon: string
          text: string
          subText: string
        }
        connection: {
          icon: string
          text: string
        }
        connection2: {
          icon: string
          text: string
        }
      }
      battery?: {
        icon: string
        text: string
        subText?: string
      }
      update: {
        text: string
        version: string
      }
      "airplane-mode"?: {
        icon: string
        text: string
        subText?: string
      }
    }
  }
}

type EntitiesDataConfig = ResponseConfig & {
  expected?: {
    entityType: string
    responseType: "file"
  }
}

type TransferConfig = {
  body: {
    transferId: number
    chunkSize: number
  }
}

type ResponseHelperConfig = ResponseConfig & {
  endpoint: APIEndpointType
  method?: APIMethodsType
}

const responseHelper = <T>({
  endpoint,
  method,
  path,
  status,
  body,
  data,
  expected,
}: ResponseHelperConfig & T) => {
  E2EMockClient.mockResponse({
    endpoint,
    method: method || "GET",
    path,
    status,
    body: cloneMerge(body, data),
    match: expected ? { expected } : undefined,
  })
}

const cloneMerge = <T, S>(data: T, newData: S) => {
  return newData ? merge(cloneDeep(data), newData) : data
}

export const ApiConfigurationResponse = (data: ApiConfig) => {
  responseHelper({
    endpoint: "API_CONFIGURATION",
    ...data,
  })
}

export const MenuConfigurationResponse = (data: MenuConfig) => {
  responseHelper({
    endpoint: "MENU_CONFIGURATION",
    ...data,
  })
}

export const OutboxResponse = (data: OutboxConfig) => {
  responseHelper({
    endpoint: "OUTBOX",
    ...data,
  })
}

export const FeatureConfigurationResponse = (data: FeatureConfig) => {
  responseHelper({
    endpoint: "FEATURE_CONFIGURATION",
    ...data,
  })
}

export const FeatureDataResponse = (data: FeatureConfig & OverviewConfig) => {
  responseHelper({
    endpoint: "FEATURE_DATA",
    ...data,
  })
}

export const EntitiesConfigurationResponse = (
  data: ResponseConfig & { body: EntitiesConfig }
) => {
  responseHelper({
    endpoint: "ENTITIES_CONFIGURATION",
    ...data,
  })
}

export const EntitiesDataResponse = (data: EntitiesDataConfig) => {
  responseHelper({
    endpoint: "ENTITIES_DATA",
    ...data,
  })
}

export const PreFileTransferResponse = (
  data: ResponseConfig & TransferConfig
) => {
  responseHelper({
    endpoint: "PRE_FILE_TRANSFER",
    ...data,
  })
}

export const FileTransferResponse = (data: ResponseConfig & TransferConfig) => {
  responseHelper({
    endpoint: "FILE_TRANSFER",
    ...data,
  })
}

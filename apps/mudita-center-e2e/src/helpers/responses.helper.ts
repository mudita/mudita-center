/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResponseStatus } from "Core/device"
import { EntitiesConfig, MCLang } from "Libs/device/models/src"
import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"

type DataResponse = {
  path: string
  body: {}
  status: ResponseStatus
}

type ApiConfig = DataResponse & {
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

export const ApiConfigurationResponse = ({ path, status, body }: ApiConfig) => {
  E2EMockClient.mockResponse({
    endpoint: "API_CONFIGURATION",
    method: "GET",
    path,
    status,
    body,
  })
}

type MenuConfig = DataResponse & {
  body: {
    title?: string
    menuItems: {
      feature: string
      displayName: string
      icon: string
    }[]
  }
}

export const MenuConfigurationResponse = ({
  path,
  status,
  body,
}: MenuConfig) => {
  E2EMockClient.mockResponse({
    endpoint: "MENU_CONFIGURATION",
    method: "GET",
    path,
    status,
    body,
  })
}

type OutboxConfig = DataResponse & {
  body: {
    features?: string[]
    entities?: EntitiesT[]
    data?: string[]
  }
}

type EntitiesT =
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

export const OutboxResponse = ({ path, status, body }: OutboxConfig) => {
  E2EMockClient.mockResponse({
    endpoint: "OUTBOX",
    method: "GET",
    path,
    status,
    body,
  })
}

type FeatureData = DataResponse & {
  expected?: {
    feature: string
    lang: MCLang
  }
}

export const FeatureConfigurationResponse = ({
  path,
  status,
  body,
  expected,
}: FeatureData) => {
  E2EMockClient.mockResponse({
    endpoint: "FEATURE_CONFIGURATION",
    method: "GET",
    path,
    status,
    body,
    match: expected ? { expected } : undefined,
  })
}

type OverviewData = {
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

export const FeatureDataResponse = ({
  path,
  status,
  body,
  expected,
}: FeatureData & OverviewData) => {
  E2EMockClient.mockResponse({
    endpoint: "FEATURE_DATA",
    method: "GET",
    path,
    status,
    body,
    match: expected ? { expected } : undefined,
  })
}

export const EntitiesConfigurationResponse = ({
  path,
  status,
  body,
}: DataResponse & { body: EntitiesConfig }) => {
  E2EMockClient.mockResponse({
    endpoint: "ENTITIES_CONFIGURATION",
    method: "GET",
    path,
    status,
    body,
  })
}

type EntitiesData = DataResponse & {
  expected: {
    entityType: string
    responseType: "file"
  }
}

// TODO
export const EntitiesDataResponse = ({ path, body, status }: EntitiesData) => {
  E2EMockClient.mockResponse({
    endpoint: "ENTITIES_DATA",
    method: "GET",
    path,
    status,
    body,
    match: {
      expected: {
        entityType: "contacts",
        responseType: "file",
      },
    },
  })
}

type TransferData = {
  body: {
    transferId: number
    chunkSize: number
  }
}

export const PreFileTransferResponse = ({
  path,
  body,
  status,
}: DataResponse & TransferData) => {
  E2EMockClient.mockResponse({
    endpoint: "PRE_FILE_TRANSFER",
    method: "GET",
    path,
    status,
    body,
  })
}

export const FileTransferResponse = ({
  path,
  body,
  status,
}: DataResponse & TransferData) => {
  E2EMockClient.mockResponse({
    endpoint: "FILE_TRANSFER",
    method: "GET",
    path,
    status,
    body,
  })
}

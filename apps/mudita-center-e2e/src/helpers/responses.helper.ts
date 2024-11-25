/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResponseStatus } from "Core/device"
import { MCLang, MenuItemConfig } from "Libs/device/models/src"
import { E2EMockClient } from "Libs/e2e-mock/client/src"

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
    entityTypes: string[]
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

// ApiConfigurationResponse({
//     path: "123",
//     status: 200,
//     //   body: ""
//     body: {
//       apiVersion: "string",
//       lang: "en-US",
//       variant: "string",
//       productId: "string",
//       vendorId: "string",
//       serialNumber: "string",
//       features: ["string[]"],
//       entityTypes: ["string[]"],
//     },
//   })

type MenuConfig = DataResponse & {
  body: {
    title?: string
    menuItems: MenuItemConfig[]
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
    features: string[]
    entities: [entitiesT]
  }
}

type entitiesT =
  | {
      entityType: string
      entityId: string
      action: "deleted" | "modified"
    }
  | { entityType: string } //TODO

type Something =
  | ({ a: number; b: number; c: number } & { [n: string]: any })
  | ({ a?: never; b?: never; c?: never } & { [n: string]: any })

export const OutboxResponse = ({ path, status, body }: OutboxConfig) => {
  E2EMockClient.mockResponse({
    endpoint: "OUTBOX",
    method: "GET",
    path,
    status,
    body,
  })
}

OutboxResponse({
  path: "123",
  status: 200,
  body: {
    features: ["123"],
    entities: [
      {
        entityType: "123",
        entityId: "123",
        action: "deleted",
      },
    ],
  },
})

type FeatureConfigurationData = DataResponse & {
  expected: {
    feature: "mc-overview" | "contacts"
    lang: MCLang
  }
}

export const FeatureConfigurationResponse = ({
  path,
  status,
  body,
  expected,
}: FeatureConfigurationData) => {
  E2EMockClient.mockResponse({
    endpoint: "FEATURE_CONFIGURATION",
    method: "GET",
    path,
    status,
    body,
    match: { expected },
  })
}

export const FeatureDataResponse = ({ path, status, body }: DataResponse) => {
  E2EMockClient.mockResponse({
    endpoint: "FEATURE_DATA",
    method: "GET",
    path,
    status,
    body,
  })
}

export const entitiesConfigurationResponse = ({
  path,
  status,
  body,
}: DataResponse) => {
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

export const PreFileTransferResponse = ({
  path,
  body,
  status,
}: DataResponse) => {
  E2EMockClient.mockResponse({
    endpoint: "PRE_FILE_TRANSFER",
    method: "GET",
    path,
    status,
    body,
  })
}

export const FileTransferResponse = ({ path, body, status }: DataResponse) => {
  E2EMockClient.mockResponse({
    endpoint: "PRE_FILE_TRANSFER",
    method: "GET",
    path,
    status,
    body,
  })
}

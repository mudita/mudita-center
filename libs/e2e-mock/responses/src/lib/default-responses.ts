/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiResponse } from "Core/device/types/mudita-os"
import { MatchConfig } from "Libs/e2e-mock/server/src"
import { APIEndpointType, APIMethodsType } from "device/models"
import { entitiesConfiguration } from "./entities-configuration-responses"
import {
  featureConfigurationContacts,
  featureConfigurationOverview,
} from "./feature-configuration-responses"
//import from "Core/device" breaks usage in e2e
enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  Redirect = 303,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  PhoneLocked = 403,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  UnprocessableEntity = 422,
  NotAccepted = 423,
  InsufficientStorage = 507,

  // lib status
  ConnectionError = 503,
  ParserError = 504,
  Timeout = 505,
}

export type ApiResponseWithConfig = ApiResponse<unknown> & {
  match?: MatchConfig
}

export type ApiResponsesWithConfigArray = ApiResponseWithConfig[]

type MethodObject = Partial<Record<APIMethodsType, ApiResponse<unknown>>>

type MethodArray = Partial<Record<APIMethodsType, ApiResponsesWithConfigArray>>

export type MockResponsesMap = Partial<Record<APIEndpointType, MethodObject>>
export type MocksArrayResponsesMap = Partial<
  Record<APIEndpointType, MethodArray>
>

export const DEFAULT_RESPONSES: MocksArrayResponsesMap = {
  API_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          apiVersion: "1.0.0",
          osVersion: "0.0.46 MuditaOS K",
          lang: "en-US",
          variant: "black",
          features: ["mc-overview", "contacts"],
          entityTypes: ["contacts"],
          productId: "2006",
          vendorId: "0e8d",
          serialNumber: "LD20240700294",
        },
      },
    ],
  },
  MENU_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          title: "Kompakt",
          menuItems: [
            {
              feature: "mc-overview",
              displayName: "Overview",
              icon: "overview",
            },
            {
              feature: "contacts",
              displayName: "Contacts",
              icon: "contacts-book",
            },
          ],
        },
      },
    ],
  },
  OUTBOX: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: { features: [], data: [] },
      },
    ],
  },
  FEATURE_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationContacts,
        match: {
          expected: {
            feature: "contacts",
            lang: "en-US",
          },
        },
      },
      {
        status: ResponseStatus.Ok,
        body: featureConfigurationOverview,
        match: {
          expected: {
            feature: "mc-overview",
            lang: "en-US",
          },
        },
      },
    ],
  },
  FEATURE_DATA: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          summary: {
            about: {
              serialNumber: { text: "0123456789ABCDEF" },
              imei1: { text: "864055030138811" },
              imei2: { text: "864055030138829" },
              sar: {
                text: "### SAR\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed aliquet ligula, viverra feugiat massa. In hac habitasse platea dictumst.\n\n1. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n2. Suspendisse consectetur, nibh non consequat hendrerit, nibh felis commodo lacus, id auctor ante purus vitae justo.\n3. Cras purus neque, pharetra vitae nulla ac, mollis facilisis felis. Sed sit amet ex diam.\n\n> Sed accumsan sem nec iaculis euismod.",
              },
            },
          },
          sections: {
            battery: { icon: "battery-charging-5", text: "100%", subText: "" },
            update: { text: "ANDROID 12", version: "0.3.0" },
            status: { badgeText: "Offline+" },
            "airplane-mode": { icon: "airplane-mode", text: "Airplane mode" },
          },
        },
      },
    ],
  },
  ENTITIES_CONFIGURATION: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: entitiesConfiguration,
      },
    ],
  },
  ENTITIES_DATA: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          filePath: "../contact_entities.json",
        },
        match: {
          expected: {
            filePath: "../contact_entities.json",
          },
        },
      },
    ],
  },
  PRE_FILE_TRANSFER: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 48647,
          chunkSize: 2358,
          fileSize: 2358,
          crc32: "1419d947",
        },
      },
    ],
  },
  FILE_TRANSFER: {
    GET: [
      {
        status: ResponseStatus.Ok,
        body: {
          transferId: 48647,
          chunkNumber: 1,
        },
      },
    ],
  },
}

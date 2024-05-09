/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiResponse } from "Core/device/types/mudita-os"
import { APIEndpointType, APIMethodsType } from "device/models"

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

type MethodObject = Partial<Record<APIMethodsType, ApiResponse<unknown>>>

type MethodArray = Partial<Record<APIMethodsType, ApiResponse<unknown>[]>>

export type MockResponsesMap = Partial<Record<APIEndpointType, MethodObject>>
export type MocksArrayResponsesMap = Partial<
  Record<APIEndpointType, MethodArray>
>

export const DEFAULT_RESPONSES: MockResponsesMap = {
  API_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        apiVersion: "1.0.0",
        lang: "en-US",
        variant: "black",
        features: ["mc-data-migration"],
        productId: "2006",
        vendorId: "0e8d",
        serialNumber: "0123456789ABCDEF",
      },
    },
  },
  MENU_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        title: "Kompakt",
        menuItems: [
          {
            feature: "mc-data-migration",
            displayName: "Data Migration",
            icon: "data-migration",
          },
        ],
      },
    },
  },
  OUTBOX: {
    GET: {
      status: ResponseStatus.Ok,
      body: { features: [], data: [] },
    },
  },
  FEATURE_DATA: {
    GET: {
      status: ResponseStatus.Ok,
      body: {},
    },
  },
  FEATURE_CONFIGURATION: {
    GET: {
      status: ResponseStatus.Ok,
      body: {
        main: {
          screenTitle: "Data migration",
          component: "mc-data-migration",
          config: {
            dataTypes: ["notes", "alarms", "callLog", "contacts"],
          },
        },
      },
    },
  },
}

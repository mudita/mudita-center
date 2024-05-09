/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResponseStatus } from "Core/device"
import { ApiResponse } from "Core/device/types/mudita-os"
import { APIEndpointType, APIMethodsType } from "device/models"

type MethodObject = Partial<Record<APIMethodsType, ApiResponse<unknown>>>

export type MockResponsesMap = Partial<Record<APIEndpointType, MethodObject>>

const DEFAULT_RESPONSES: MockResponsesMap = {
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

export default DEFAULT_RESPONSES

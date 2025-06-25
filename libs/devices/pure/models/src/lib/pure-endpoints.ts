/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PureInfoRequestValidator,
  PureInfoResponseValidator,
} from "./endpoints/device-info"
import { z } from "zod"
import {
  PureLockStatusRequestValidator,
  PureLockStatusResponseValidator,
} from "./endpoints/lock-status"

export enum PureEndpointNamed {
  Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FileSystem = 3,
  Backup = 4,
  Restore = 5,
  Factory = 6,
  Contacts = 7,
  Messages = 8,
  CallLog = 9,
  Security = 13,
  Outbox = 14,
  TimeSynchronization = 16,

  // api version (mocked)
  ApiVersion = 1000,
}

export enum PureMethodNamed {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

type EndpointsDefinition = Record<
  string,
  Partial<Record<PureMethodNamed, { request?: z.ZodType; response: z.ZodType }>>
>

export const PureEndpoints = {
  [PureEndpointNamed.Security]: {
    [PureMethodNamed.Get]: {
      request: PureLockStatusRequestValidator,
      response: PureLockStatusResponseValidator,
    },
  },
  [PureEndpointNamed.DeviceInfo]: {
    [PureMethodNamed.Get]: {
      request: PureInfoRequestValidator,
      response: PureInfoResponseValidator,
    },
  },
} satisfies EndpointsDefinition

export type PureEndpoint = keyof typeof PureEndpoints

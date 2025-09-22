/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  HarmonyInfoRequestValidator,
  HarmonyInfoResponseValidator,
  HarmonyLogsRequestValidator,
  HarmonyLogsValidator,
} from "./endpoints/device-info"
import { z } from "zod"
import {
  HarmonyGetTimeRequestValidator,
  HarmonyGetTimeResponseValidator,
  HarmonySynchronizeTimeRequestValidator,
  HarmonySynchronizeTimeResponseValidator,
} from "./endpoints/time-synchronization"
import {
  HarmonyDeleteFileRequestValidator,
  HarmonyDeleteFileResponseValidator,
  HarmonyGetFileListRequestValidator,
  HarmonyGetFileListResponseValidator,
} from "./endpoints/file-system"

export enum HarmonyEndpointNamed {
  Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FileSystem = 3,
  Backup = 4,
  Restore = 5,
  Factory = 6,
  Security = 13,
  Outbox = 14,
  TimeSynchronization = 16,

  // api version (mocked)
  ApiVersion = 1000,
}

export enum HarmonyMethodNamed {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

type EndpointsDefinition = Record<
  string,
  Partial<
    Record<HarmonyMethodNamed, { request?: z.ZodType; response: z.ZodType }>
  >
>

export const HarmonyEndpoints = {
  [HarmonyEndpointNamed.DeviceInfo]: {
    [HarmonyMethodNamed.Get]: {
      request: z.union([
        HarmonyInfoRequestValidator,
        HarmonyLogsRequestValidator,
      ]),
      response: z.union([HarmonyInfoResponseValidator, HarmonyLogsValidator]),
    },
  },
  [HarmonyEndpointNamed.TimeSynchronization]: {
    [HarmonyMethodNamed.Get]: {
      request: HarmonyGetTimeRequestValidator,
      response: HarmonyGetTimeResponseValidator,
    },
    [HarmonyMethodNamed.Post]: {
      request: HarmonySynchronizeTimeRequestValidator,
      response: HarmonySynchronizeTimeResponseValidator,
    },
  },
  [HarmonyEndpointNamed.FileSystem]: {
    [HarmonyMethodNamed.Get]: {
      request: HarmonyGetFileListRequestValidator,
      response: HarmonyGetFileListResponseValidator,
    },
    [HarmonyMethodNamed.Delete]: {
      request: HarmonyDeleteFileRequestValidator,
      response: HarmonyDeleteFileResponseValidator,
    },
  },
} satisfies EndpointsDefinition

export type HarmonyEndpoint = keyof typeof HarmonyEndpoints

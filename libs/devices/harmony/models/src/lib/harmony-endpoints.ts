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
  HarmonyPreSendFileRequestValidator,
  HarmonyPreSendFileResponseValidator,
  HarmonySendFileChunkRequestValidator,
  HarmonySendFileChunkResponseValidator,
} from "./endpoints/file-transfer"
import {
  HarmonyUpdateRequestValidator,
  HarmonyUpdateResponseValidator,
} from "./endpoints/update"
import {
  HarmonyDeleteFileRequestValidator,
  HarmonyDeleteFileResponseValidator,
} from "./endpoints/file-delete"

export enum HarmonyEndpointNamed {
  // Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FileSystem = 3,
  // Backup = 4,
  // Restore = 5,
  // Factory = 6,
  // Security = 13,
  // Outbox = 14,
  TimeSynchronization = 16,

  // api version (mocked)
  // ApiVersion = 1000,
}

export enum HarmonyMethodNamed {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

type EndpointsDefinition = Record<
  HarmonyEndpointNamed,
  Partial<
    Record<HarmonyMethodNamed, { request?: z.ZodType; response?: z.ZodType }>
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
    [HarmonyMethodNamed.Put]: {
      request: z.union([
        HarmonyPreSendFileRequestValidator,
        HarmonySendFileChunkRequestValidator,
      ]),
      response: z.union([
        HarmonyPreSendFileResponseValidator,
        HarmonySendFileChunkResponseValidator,
      ]),
    },
    [HarmonyMethodNamed.Delete]: {
      request: HarmonyDeleteFileRequestValidator,
      response: HarmonyDeleteFileResponseValidator,
    },
  },
  [HarmonyEndpointNamed.Update]: {
    [HarmonyMethodNamed.Post]: {
      request: HarmonyUpdateRequestValidator,
      response: HarmonyUpdateResponseValidator,
    },
  },
} as const satisfies EndpointsDefinition

export type HarmonyEndpoint = keyof typeof HarmonyEndpoints

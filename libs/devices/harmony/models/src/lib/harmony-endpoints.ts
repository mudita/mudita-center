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
  HarmonyDownloadFileChunkRequestValidator,
  HarmonyDownloadFileChunkResponseValidator,
  HarmonyPreDownloadFileRequestValidator,
  HarmonyPreDownloadFileResponseValidator,
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
import {
  HarmonyGetFileListRequestValidator,
  HarmonyGetFileListResponseValidator,
} from "./endpoints/file-get-list"
import {
  HarmonyPostBackupRequestValidator,
  HarmonyPostBackupResponseValidator,
} from "./endpoints/backup-post"
import {
  HarmonyGetBackupRequestValidator,
  HarmonyGetBackupResponseValidator,
} from "./endpoints/backup-get"
import {
  HarmonyPostQuotationRequestValidator,
  HarmonyPostQuotationResponseValidator,
} from "./endpoints/quotation-post"
import {
  HarmonyDeleteQuotationRequestValidator,
  HarmonyDeleteQuotationResponseValidator,
} from "./endpoints/quotation-delete"
import {
  HarmonyGetGroupQuotationRequestValidator,
  HarmonyGetGroupQuotationResponseValidator,
  HarmonyGetIntervalQuotationRequestValidator,
  HarmonyGetIntervalQuotationResponseValidator,
} from "./endpoints/quotation-get"
import {
  HarmonyPutGroupQuotationRequestValidator,
  HarmonyPutGroupQuotationResponseValidator,
  HarmonyPutIntervalQuotationRequestValidator,
  HarmonyPutIntervalQuotationResponseValidator,
} from "./endpoints/quotation-put"

export enum HarmonyEndpointNamed {
  // Invalid = 0,
  DeviceInfo = 1,
  Update = 2,
  FileSystem = 3,
  Backup = 4,
  // Restore = 5,
  // Factory = 6,
  // Security = 13,
  // Outbox = 14,
  TimeSynchronization = 16,
  Quotations = 17,
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
    [HarmonyMethodNamed.Get]: {
      request: z.union([
        HarmonyGetFileListRequestValidator,
        HarmonyPreDownloadFileRequestValidator,
        HarmonyDownloadFileChunkRequestValidator,
      ]),
      response: z.union([
        HarmonyGetFileListResponseValidator,
        HarmonyPreDownloadFileResponseValidator,
        HarmonyDownloadFileChunkResponseValidator,
      ]),
    },
    [HarmonyMethodNamed.Delete]: {
      request: HarmonyDeleteFileRequestValidator,
      response: HarmonyDeleteFileResponseValidator,
    },
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
  },
  [HarmonyEndpointNamed.Update]: {
    [HarmonyMethodNamed.Post]: {
      request: HarmonyUpdateRequestValidator,
      response: HarmonyUpdateResponseValidator,
    },
  },
  [HarmonyEndpointNamed.Backup]: {
    [HarmonyMethodNamed.Get]: {
      request: HarmonyGetBackupRequestValidator,
      response: HarmonyGetBackupResponseValidator,
    },
    [HarmonyMethodNamed.Post]: {
      request: HarmonyPostBackupRequestValidator,
      response: HarmonyPostBackupResponseValidator,
    },
  },
  [HarmonyEndpointNamed.Quotations]: {
    [HarmonyMethodNamed.Get]: {
      request: z.union([
        HarmonyGetGroupQuotationRequestValidator,
        HarmonyGetIntervalQuotationRequestValidator,
      ]),
      response: z.union([
        HarmonyGetGroupQuotationResponseValidator,
        HarmonyGetIntervalQuotationResponseValidator,
      ]),
    },
    [HarmonyMethodNamed.Post]: {
      request: HarmonyPostQuotationRequestValidator,
      response: HarmonyPostQuotationResponseValidator,
    },
    [HarmonyMethodNamed.Delete]: {
      request: HarmonyDeleteQuotationRequestValidator,
      response: HarmonyDeleteQuotationResponseValidator,
    },
    [HarmonyMethodNamed.Put]: {
      request: z.union([
        HarmonyPutGroupQuotationRequestValidator,
        HarmonyPutIntervalQuotationRequestValidator,
      ]),
      response: z.union([
        HarmonyPutGroupQuotationResponseValidator,
        HarmonyPutIntervalQuotationResponseValidator,
      ]),
    },
  },
} as const satisfies EndpointsDefinition

export type HarmonyEndpoint = keyof typeof HarmonyEndpoints

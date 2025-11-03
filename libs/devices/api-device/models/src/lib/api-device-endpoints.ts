/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiConfigRequestValidator,
  ApiConfigResponseValidator,
} from "./endpoints/api-config/api-config"
import {
  MenuConfigRequestValidator,
  MenuConfigResponseValidator,
} from "./endpoints/menu-config/menu-config"
import {
  FeatureConfigRequestValidator,
  FeatureConfigResponseValidator,
} from "./endpoints/feature/feature-config"
import {
  FeatureDataRequestValidator,
  FeatureDataResponseValidator,
} from "./endpoints/feature/feature-data"
import {
  PostBackupRequestValidator,
  PostBackupResponseValidator,
  PreBackupGetRequestValidator,
  PreBackupPostRequestValidator,
  PreBackupResponseValidator200,
  PreBackupResponseValidator202,
} from "./endpoints/backup/backup-create"
import { z } from "zod"
import {
  FileTransferGetRequestValidator,
  FileTransferGetResponseValidator,
  PreFileTransferGetRequestValidator,
  PreFileTransferGetResponseValidator,
} from "./endpoints/file-transfer/get-file"
import {
  DeleteRestoreRequestValidator,
  DeleteRestoreResponseValidator,
  PreRestoreRequestValidator,
  PreRestoreResponseValidator,
  RestoreRequestValidator,
  RestoreResponseValidator,
} from "./endpoints/backup/backup-restore"
import {
  FileTransferPostRequestValidator,
  FileTransferPostResponseValidator,
  PreFileTransferPostRequestValidator,
  PreFileTransferPostResponseValidator,
} from "./endpoints/file-transfer/post-file"
import {
  GetEntitiesDataRequestValidator,
  GetEntitiesDataResponseValidator,
} from "./endpoints/entities/entities-data-get.validator"
import {
  DeleteEntitiesRequestValidator,
  DeleteEntitiesResponseValidator,
} from "./endpoints/entities/entities-delete.validator"

type Method = "GET" | "POST" | "PUT" | "DELETE"

type EndpointsDefinition = Record<
  string,
  Partial<
    Record<Method, { request: z.ZodType | undefined; response: z.ZodType }>
  >
>

export const ApiDeviceEndpoints = {
  API_CONFIGURATION: {
    GET: {
      request: ApiConfigRequestValidator,
      response: ApiConfigResponseValidator,
    },
  },
  MENU_CONFIGURATION: {
    GET: {
      request: MenuConfigRequestValidator,
      response: MenuConfigResponseValidator,
    },
  },
  FEATURE_CONFIGURATION: {
    GET: {
      request: FeatureConfigRequestValidator,
      response: FeatureConfigResponseValidator,
    },
  },
  FEATURE_DATA: {
    GET: {
      request: FeatureDataRequestValidator,
      response: FeatureDataResponseValidator,
    },
  },
  PRE_FILE_TRANSFER: {
    GET: {
      request: PreFileTransferGetRequestValidator,
      response: PreFileTransferGetResponseValidator,
    },
    POST: {
      request: PreFileTransferPostRequestValidator,
      response: PreFileTransferPostResponseValidator,
    },
  },
  FILE_TRANSFER: {
    GET: {
      request: FileTransferGetRequestValidator,
      response: FileTransferGetResponseValidator,
    },
    POST: {
      request: FileTransferPostRequestValidator,
      response: FileTransferPostResponseValidator,
    },
  },
  PRE_BACKUP: {
    GET: {
      request: PreBackupGetRequestValidator,
      response: z.union([
        PreBackupResponseValidator200,
        PreBackupResponseValidator202,
      ]),
    },
    POST: {
      request: PreBackupPostRequestValidator,
      response: z.union([
        PreBackupResponseValidator200,
        PreBackupResponseValidator202,
      ]),
    },
  },
  POST_BACKUP: {
    POST: {
      request: PostBackupRequestValidator,
      response: PostBackupResponseValidator,
    },
  },
  PRE_RESTORE: {
    POST: {
      request: PreRestoreRequestValidator,
      response: PreRestoreResponseValidator,
    },
  },
  RESTORE: {
    GET: {
      request: RestoreRequestValidator,
      response: RestoreResponseValidator,
    },
    POST: {
      request: RestoreRequestValidator,
      response: RestoreResponseValidator,
    },
    DELETE: {
      request: DeleteRestoreRequestValidator,
      response: DeleteRestoreResponseValidator,
    },
  },
  ENTITIES_DATA: {
    GET: {
      request: GetEntitiesDataRequestValidator,
      response: GetEntitiesDataResponseValidator,
    },
    DELETE: {
      request: DeleteEntitiesRequestValidator,
      response: DeleteEntitiesResponseValidator,
    },
  },
} as const satisfies EndpointsDefinition

export type ApiDeviceEndpoint = keyof typeof ApiDeviceEndpoints

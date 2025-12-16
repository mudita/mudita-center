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
import {
  OutboxRequestValidator,
  OutboxResponseValidator,
} from "./endpoints/outbox/outbox-get.validator"
import {
  GetEntitiesConfigRequestValidator,
  GetEntitiesConfigResponseValidator,
} from "./endpoints/entities/entities-config-get.validator"
import {
  PostEntityDataRequestValidator,
  PostEntityDataResponseValidator,
} from "./endpoints/entities/entity-data-post.validator"
import {
  FileTransferDeleteRequestValidator,
  FileTransferDeleteResponseValidator,
} from "./endpoints/file-transfer/delete-file"
import {
  AppInstallPostRequestValidator,
  AppInstallPostResponseValidator,
} from "./endpoints/app-install/post-app-install"
import {
  AppInstallGetRequestValidator,
  AppInstallGetResponseValidator,
} from "./endpoints/app-install/get-app-install"
import {
  DataTransferDeleteRequestValidator,
  DataTransferDeleteResponseValidator200,
  DataTransferDeleteResponseValidator202,
  DataTransferGetRequestValidator,
  DataTransferGetResponseValidator200,
  DataTransferGetResponseValidator202,
  DataTransferPostRequestValidator,
  DataTransferPostResponseValidator200,
  DataTransferPostResponseValidator202,
  PreDataTransferPostRequestValidator,
  PreDataTransferPostResponseValidator,
} from "./endpoints/data-transfer/data-transfer"

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
  OUTBOX: {
    GET: {
      request: OutboxRequestValidator,
      response: OutboxResponseValidator,
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
    DELETE: {
      request: FileTransferDeleteRequestValidator,
      response: FileTransferDeleteResponseValidator,
    },
  },
  PRE_DATA_TRANSFER: {
    POST: {
      request: PreDataTransferPostRequestValidator,
      response: PreDataTransferPostResponseValidator,
    },
  },
  DATA_TRANSFER: {
    GET: {
      request: DataTransferGetRequestValidator,
      response: z.union([
        DataTransferGetResponseValidator200,
        DataTransferGetResponseValidator202,
      ]),
    },
    POST: {
      request: DataTransferPostRequestValidator,
      response: z.union([
        DataTransferPostResponseValidator200,
        DataTransferPostResponseValidator202,
      ]),
    },
    DELETE: {
      request: DataTransferDeleteRequestValidator,
      response: z.union([
        DataTransferDeleteResponseValidator200,
        DataTransferDeleteResponseValidator202,
      ]),
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
  ENTITIES_CONFIGURATION: {
    GET: {
      request: GetEntitiesConfigRequestValidator,
      response: GetEntitiesConfigResponseValidator,
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
    POST: {
      request: PostEntityDataRequestValidator,
      response: PostEntityDataResponseValidator,
    },
  },
  APP_INSTALL: {
    POST: {
      request: AppInstallPostRequestValidator,
      response: AppInstallPostResponseValidator,
    },
    GET: {
      request: AppInstallGetRequestValidator,
      response: AppInstallGetResponseValidator,
    },
  },
} as const satisfies EndpointsDefinition

export type ApiDeviceEndpoint = keyof typeof ApiDeviceEndpoints

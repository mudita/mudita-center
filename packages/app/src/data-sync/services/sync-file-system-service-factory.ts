/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

export class SyncFileSystemServiceFactory {
  static create(token: string): SyncFileSystemService {
    return new SyncFileSystemService(token)
  }
}

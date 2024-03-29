/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum APIRestoreServiceEvents {
  PreRestore = "apiservice_restore-pre-restore",
  StartRestore = "apiservice_restore-start-restore",
  CancelRestore = "apiservice_restore-cancel-restore",
  CheckRestore = "apiservice_restore-check-restore",
  LoadBackupMetadata = "apiservice_restore-get-metadata",
}

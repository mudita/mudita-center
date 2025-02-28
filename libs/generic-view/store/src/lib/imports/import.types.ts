/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ImportStatus {
  Init = "INIT",
  FileSelect = "FILE-SELECT",
  PendingAuth = "PENDING-AUTH",
  Auth = "AUTH",
  ImportIntoMcInProgress = "IMPORT-INTO-MC-IN-PROGRESS",
  ImportIntoMcDone = "IMPORT-INTO-MC-DONE",
  ImportIntoDeviceInProgress = "IMPORT-INTO-DEVICE-IN-PROGRESS",
  Done = "DONE",
  Failed = "FAILED",
}

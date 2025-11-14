/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppMtpIpcEvents {
  GetMtpDeviceId = "app-mtp:get-mtp-device-id",
  GetDeviceStorages = "app-mtp:get-device-storages",
  StartTransferFile = "app-mtp:start-transfer-file",
  GetTransferredFileProgress = "app-mtp:get-transferred-file-progress",
  CancelFileTransfer = "app-mtp:cancel-file-transfer",
}

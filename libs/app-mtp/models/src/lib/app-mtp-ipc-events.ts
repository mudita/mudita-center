/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppMtpIpcEvents {
  GetMtpDeviceId = "app-mtp:get-mtp-device-id",
  GetDeviceStorages = "app-mtp:get-device-storages",
  StartSendFile = "app-mtp:start-send-file",
  GetSendFileProgress = "app-mtp:get-send-file-progress",
  CancelSendFile = "app-mtp:cancel-send-file",
}

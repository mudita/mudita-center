/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MtpFileTransferServiceEvents {
  StartSendFile = "mtp-file-transfer/start-send-file",
  GetMtpDeviceId = "mtp-file-transfer/get-mtp-device-id",
  GetDeviceStorages = "mtp-file-transfer/get-device-storages",
  GetSendFileProgress = "mtp-file-transfer/get-send-file-progress",
  CancelSendFile = "mtp-file-transfer/cancel-send-file",
}

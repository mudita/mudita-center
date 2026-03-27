/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type {} from "types-preload"

export const AppMtp = {
  prepareMtpEnvironment: window.api.appMtp.prepareMtpEnvironment,
  getMtpDeviceId: window.api.appMtp.getMtpDeviceId,
  getDeviceStorages: window.api.appMtp.getDeviceStorages,
  startTransferFile: window.api.appMtp.startTransferFile,
  getTransferredFileProgress: window.api.appMtp.getTransferredFileProgress,
  cancelFileTransfer: window.api.appMtp.cancelFileTransfer,
}

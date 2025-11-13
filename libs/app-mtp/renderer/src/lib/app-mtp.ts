/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppMtp = {
  getMtpDeviceId: window.api.appMtp.getMtpDeviceId,
  getDeviceStorages: window.api.appMtp.getDeviceStorages,
  startSendFile: window.api.appMtp.startSendFile,
  getSendFileProgress: window.api.appMtp.getSendFileProgress,
  cancelSendFile: window.api.appMtp.cancelSendFile,
}

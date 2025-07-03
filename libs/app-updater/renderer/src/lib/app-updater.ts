/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppUpdater = {
  check: window.api.appUpdater.check,
  download: window.api.appUpdater.download,
  cancel: window.api.appUpdater.cancel,
  onProgress: window.api.appUpdater.onProgress,
  install: window.api.appUpdater.install,
}

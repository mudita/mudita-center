/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppActions = {
  close: window.api.appActions.close,
  openFileDialog: window.api.appActions.openFileDialog,
  openLegalWindow: window.api.appActions.openLegalWindow,
  getAppVersion: window.api.appActions.getAppVersion,
}

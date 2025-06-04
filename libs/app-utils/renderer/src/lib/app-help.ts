/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppHelp = {
  getData: window.api.appHelp.getData,
  onDataUpdated: window.api.appHelp.onDataUpdated,
  removeDataUpdatedListener: window.api.appHelp.removeDataUpdatedListener,
}

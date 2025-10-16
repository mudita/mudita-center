/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppSql = {
  run: window.api.sql.run,
  exec: window.api.sql.exec,
  initialize: window.api.sql.initialize,
}

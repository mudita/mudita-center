/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "preload-types"

export class AppSql {
  static run(name: string, query: string) {
    return window.api.sql.run(name, query)
  }
  static exec(name: string, query: string) {
    return window.api.sql.exec(name, query)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"

export class AppPathService {
  static join(...segments: string[]): string {
    return path.join(...segments)
  }
}

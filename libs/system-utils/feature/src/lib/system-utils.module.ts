/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Directory } from "./directory/directory.service"

export class SystemUtilsModule {
  public directory = new Directory()

  constructor() {}

  public getServices() {
    return [this.directory]
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Initializer } from "App/core/types"

export class InitializeInitializer {
  public initialize(initializers: Initializer[]): void {
    initializers.forEach((initializer) => initializer.initialize())
  }
}

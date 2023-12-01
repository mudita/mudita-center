/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"

export class ObserverInitializer {
  public initialize(observers: Observer[]): void {
    observers.forEach((observer) => observer.observe())
  }
}

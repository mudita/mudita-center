/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr, { Index } from "elasticlunr"
import { words } from "App/index-storage/constants"

export class ElasticlunrFactory {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-types
  static create<Type extends {}>(): Index<Type> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(elasticlunr.stopWordFilter as any).stopWords = words

    const index = elasticlunr<Type>()

    return index
  }
}

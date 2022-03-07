/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataKey } from "App/metadata/constants"

type KeyStorage = Map<MetadataKey, string | number | null | undefined>

export class MetadataStore {
  // Register new key here
  private store = new Map<MetadataKey, string | number | null | undefined>()

  get metadata(): KeyStorage {
    return this.store
  }

  setValue(
    key: MetadataKey,
    value: string | number | number | undefined | null
  ): void {
    this.metadata.set(key, typeof value === "number" ? String(value) : value)
  }

  getValue(key: MetadataKey): string | number | null | undefined {
    return this.metadata.get(key)
  }
}

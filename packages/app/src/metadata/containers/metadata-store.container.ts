/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataStore } from "App/metadata/services"
import { MetadataStoreDoesntInitializedError } from "App/metadata/errors"

let metadataStore: MetadataStore | null = null

export const getMetadataStore = (): MetadataStore | never => {
  if (!metadataStore) {
    throw new MetadataStoreDoesntInitializedError(
      "Store doesn't initialized yet!"
    )
  }

  return metadataStore
}

export const createMetadataStore = (): MetadataStore => {
  metadataStore = new MetadataStore()
  return metadataStore
}

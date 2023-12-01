/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { MetadataError } from "App/metadata/constants"
import { MetadataStore } from "App/metadata/services"

let metadataStore: MetadataStore | null = null

export const getMetadataStore = (): MetadataStore | never => {
  if (!metadataStore) {
    throw new AppError(
      MetadataError.MetadataStoreDoesntInitialized,
      "Store doesn't initialized yet!"
    )
  }

  return metadataStore
}

export const createMetadataStore = (): MetadataStore => {
  metadataStore = new MetadataStore()
  return metadataStore
}

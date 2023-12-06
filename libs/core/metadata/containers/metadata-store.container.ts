/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "Core/core/errors"
import { MetadataError } from "Core/metadata/constants"
import { MetadataStore } from "Core/metadata/services"

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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MetadataError } from "App/metadata/constants"

export class MetadataStoreDoesntInitializedError extends Error {
  public type = MetadataError.MetadataStoreDoesntInitialized

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MetadataStoreDoesntInitializedError)
    }
  }
}

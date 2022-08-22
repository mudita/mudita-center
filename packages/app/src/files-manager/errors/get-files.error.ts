/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FilesManagerError } from "App/files-manager/constants"

export class GetFilesError extends Error {
  public type = FilesManagerError.GetFiles

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GetFilesError)
    }
  }
}

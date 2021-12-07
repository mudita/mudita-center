/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MusicError } from "Renderer/modules/music/errors.enum"

export class DownloadFileError extends Error {
  public type = MusicError.DownloadFile

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DownloadFileError)
    }
  }
}

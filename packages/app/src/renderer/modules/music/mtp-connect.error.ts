/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MusicError } from "Renderer/modules/music/errors.enum"

export class MtpConnectError extends Error {
  public type = MusicError.MtpConnect

  constructor(public message: string, public payload?: any) {
    super()

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MtpConnectError)
    }
  }
}

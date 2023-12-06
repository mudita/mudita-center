/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestPayload, Response } from "Core/device/types/mudita-os"

export abstract class SerialPortParserBase {
  public abstract parse(data: Buffer): Response<unknown> | undefined

  public abstract createRequest(payload: RequestPayload<unknown>): string
}

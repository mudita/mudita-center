/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestPayload, Response } from "App/device/types/mudita-os"

export abstract class SerialPortParserBase {
  public abstract parse(data: Buffer): any

  public abstract createRequest(payload: unknown): string
}

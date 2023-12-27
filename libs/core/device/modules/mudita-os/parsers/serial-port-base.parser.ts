/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export abstract class SerialPortParserBase {
  public abstract parse(data: Buffer): unknown

  public abstract createRequest(payload: unknown): string
}

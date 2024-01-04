/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export abstract class SerialPortParserBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract parse(data: Buffer): any

  public abstract createRequest(payload: unknown): string
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as CRC32 from "crc-32"
import { DeviceProtocol } from "device-protocol/feature"

export abstract class BaseCommand {
  constructor(public deviceProtocol: DeviceProtocol) {}

  public countCRC32(buffer: Buffer | Uint8Array): string {
    const crc = CRC32.buf(buffer)
    return (crc >>> 0).toString(16).padStart(8, "0").toLowerCase()
  }
}

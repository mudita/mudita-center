/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MtpInterface } from "./app-mtp.interface"
import { DotnetMtp } from "./dotnet-mtp/dotnet-mtp"
import { NodeMtp } from "./node-mtp/node-mtp"

export class MtpFactory {
  static createInstance(): MtpInterface {
    if (process.platform === "win32") {
      return new DotnetMtp()
    } else {
      return new NodeMtp()
    }
  }
}

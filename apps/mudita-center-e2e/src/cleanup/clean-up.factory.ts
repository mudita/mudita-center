/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceAdapter, SerialPortAdapter } from "../device/adapters"
import { DeviceService } from "../device/services"
import { GithubHttpAdapter } from "./adapters"
import { FlashDeviceCommand, DecompressTarCommand } from "./commands"
import { TestConfigurationProvider } from "./providers"
import {
  CleanUpServiceClass,
  CleanUpService,
  FlashDeviceService,
  ReleaseService,
} from "./services"

export class CleanUpFactory {
  public create(): CleanUpServiceClass {
    return new CleanUpService(
      new DeviceService(new DeviceAdapter(), new SerialPortAdapter()),
      new FlashDeviceService(new FlashDeviceCommand()),
      new ReleaseService(
        new GithubHttpAdapter(),
        new DecompressTarCommand(),
        new TestConfigurationProvider()
      )
    )
  }
}

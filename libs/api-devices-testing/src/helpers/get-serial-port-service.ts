/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPortService } from "app-serialport/main"

let serialPortService: AppSerialPortService

export const getSerialPortService = async (): Promise<AppSerialPortService> => {
  if (!serialPortService) {
    serialPortService = new AppSerialPortService()
    await serialPortService.init()
  }

  return serialPortService
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortAdapter, DeviceAdapter } from "../../device/adapters"
import { DeviceService } from "../../device/services"
import { RequestsService } from "../../device/services/requests.service"
import { ContactService } from "../services/contact.service"
import { SeedService } from "../services/seed-service"

export class SeedServiceFactory {
  create() {
    const serialPortAdapter = new SerialPortAdapter()

    const contactsService = new ContactService(
      new RequestsService(
        new SerialPortAdapter(),
        new DeviceService(new DeviceAdapter(), serialPortAdapter)
      )
    )

    return new SeedService(contactsService)
  }
}

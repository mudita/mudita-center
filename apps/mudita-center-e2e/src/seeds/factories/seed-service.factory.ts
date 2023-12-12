/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortAdapter, DeviceAdapter } from "../../device/adapters"
import { DeviceService } from "../../device/services"
import { RequestsService } from "../../device/services/requests.service"
import { TemplatesService } from "../services"
import { ContactService } from "../services/contact.service"
import { SeedService } from "../services/seed-service"

export class SeedServiceFactory {
  create() {
    const serialPortAdapter = new SerialPortAdapter()
    const requestsService = new RequestsService(
      new SerialPortAdapter(),
      new DeviceService(new DeviceAdapter(), serialPortAdapter)
    )

    const contactsService = new ContactService(requestsService)

    const templatesService = new TemplatesService(requestsService)

    return new SeedService(contactsService, templatesService)
  }
}
